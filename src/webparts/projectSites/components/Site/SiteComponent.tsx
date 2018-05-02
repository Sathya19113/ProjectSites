import * as React from "react";

import { ProjectSite } from "../../Interfaces/ProjectSite";
import styles from '../ProjectSites.module.scss';

export interface ISiteComponentProps {
    name: string;
    attachment: string;
    siteUrl: string;
}

export class SiteComponent extends React.Component<ISiteComponentProps, any> {
    public render() {
        const { attachment, siteUrl, name } = this.props;

        return (
            <div className="ms-Grid-col ms-lg12 ms-md12 ms-sm12">
                <div className="ms-Grid-col ms-lg3 ms-md12 ms-sm12">
                    <img className={styles.projectSiteImage} src={attachment} />
                </div>
                <div className={styles.projectSiteTitle + " ms-Grid-col ms-lg6 ms-md12 ms-sm12"}>
                    <a href={siteUrl} target="_blank">{name}</a>
                </div>
            </div>
        );
    }
}