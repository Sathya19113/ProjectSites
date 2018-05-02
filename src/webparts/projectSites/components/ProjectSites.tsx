import * as React from 'react';
import {
  Spinner,
  SpinnerSize
} from 'office-ui-fabric-react/lib/Spinner';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './ProjectSites.module.scss';
import { IProjectSitesProps } from './IProjectSiteProps';
import { ProjectSiteService } from '../Services/ProjectSiteService';
import { ProjectSitesMapperService } from '../Services/AutoMapperService';
import { SiteComponent } from './Site/SiteComponent';
import { ProjectSite } from '../Interfaces/ProjectSite';

export interface IProjectSitesState {
  ProjectSites: Array<ProjectSite>;
  IsSPCallOnProgress: boolean;
}

export default class ProjectSites extends React.Component<IProjectSitesProps, IProjectSitesState> {

  public _projectSiteService: ProjectSiteService = new ProjectSiteService(this.props.context);
  constructor(props: IProjectSitesProps, state?: any) {
    super(props);
    this.state = {
      ProjectSites: [],
      IsSPCallOnProgress: true,
    };
  }

  private _getProjectSites = (region: string | number) => {

    this.setState((prevState : IProjectSitesState) => ({
      ProjectSites: [],
      IsSPCallOnProgress: true,
    }));

    this._projectSiteService.getProjectSitesByListName(region).then((data) => {
      if (data && data.length != 0) {
        var projectSites = new ProjectSitesMapperService(data).ProjectSites;
        this.setState((prevState) => ({
          ProjectSites: projectSites,
          IsSPCallOnProgress: false,
        }));
      }
      else {
        this.setState(prevState => ({
          IsSPCallOnProgress: false
        }));
      }
    }, (error) => {
      this.setState(prevState => ({
        IsSPCallOnProgress: false
      }));
    });
  }

  public componentDidMount() {
    this._getProjectSites(this.props.regionListName);
  }

  public componentWillReceiveProps(nextProps: IProjectSitesProps) {
    this._getProjectSites(nextProps.regionListName);
  }

  public render(): React.ReactElement<IProjectSitesProps> {

    const { ProjectSites, IsSPCallOnProgress } = this.state;
    const { regionListName } = this.props;

    const ProjectSiteCollection = ProjectSites.map((site: ProjectSite) => {
      return (
        <SiteComponent name={site.Title} attachment={site.Attachement} siteUrl={site.Url} />
      );
    });

    return (
      <div className="ms-Grid ms-Grid-row">
        <div className="ms-Grid-col ms-lg12 ms-md12 ms-sm12">
          <span>Project Sites in Region : {regionListName}</span>
        </div>
        <div className={styles.projectSites + " ms-Grid-col ms-lg8 ms-md8 ms-sm8"}>
          {IsSPCallOnProgress && <Spinner size={SpinnerSize.large} label='Fetching Project Sites...' />}
          {!IsSPCallOnProgress && ProjectSites.length != 0 &&
            ProjectSiteCollection
          }
          {!IsSPCallOnProgress && (!ProjectSites || ProjectSites.length == 0) &&
            <span>No Project Sites are found in this region</span>
          }
        </div>
      </div>
    );
  }
}
