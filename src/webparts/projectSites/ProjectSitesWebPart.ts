import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import WebPartContext from '@microsoft/sp-webpart-base/lib/core/WebPartContext';
import { PropertyPaneDropdown } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneDropdown/PropertyPaneDropdown';

import * as strings from 'ProjectSitesWebPartStrings';
import ProjectSites from './components/ProjectSites';
import { IProjectSitesProps } from './components/IProjectSiteProps';
import { ProjectSiteService } from './Services/ProjectSiteService';

export interface IProjectSiteswebPartProps {
  description: string;
  context: WebPartContext;
  regionListName: string | number;
}

export default class ProjectSitesWebPart extends BaseClientSideWebPart<IProjectSiteswebPartProps> {

  public render(): void {
    const element: React.ReactElement<IProjectSitesProps> = React.createElement(
      ProjectSites,
      {
        description: this.properties.description,
        context: this.context,
        regionListName: this.properties.regionListName
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    var projectSiteService = new ProjectSiteService();
    projectSiteService.setRegionLists();
    return Promise.resolve();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneDropdown('regionListName', {
                  label: strings.RegionFieldLabel,
                  options: ProjectSiteService.ListNames,
                  selectedKey: this.properties.regionListName
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
