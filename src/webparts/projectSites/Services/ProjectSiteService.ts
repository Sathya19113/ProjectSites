import { IWebPartContext, WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClientResponse, SPHttpClient } from "@microsoft/sp-http";
import { RegionList } from "../RegionList";
import { IPropertyPaneDropdownOption } from "@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneDropdown/IPropertyPaneDropdown";

export class ProjectSiteService {

    static ListNames: IPropertyPaneDropdownOption[] = [];

    constructor(private _context?: WebPartContext) { }

    public getProjectSitesByListName = (regionList: number | string) => {
        return this._context.spHttpClient.get(`${this._context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('${regionList}Navigation')/items?$select=Title,url,Project_x0020_Type,ID,Description,Country,AttachmentFiles&$expand=AttachmentFiles`,
            SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
                return response.json().then((data) => {
                    debugger;
                    return data.value;
                }, (error) => {
                    console.log("Error Message: " + error);
                    return [];
                });
            });
    }

    public getSiteUsers = () => {
        return this._context.spHttpClient.get(`${this._context.pageContext.web.absoluteUrl}/_api/web/siteusers`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json().then((data) => {
                    return data.value;
                }); 
            });
    }

    public setRegionLists = () => {
        for (var region in RegionList) {
            debugger;
            ProjectSiteService.ListNames.push({
                key: RegionList[region],
                text: RegionList[region]
            });
        }
    }
}
