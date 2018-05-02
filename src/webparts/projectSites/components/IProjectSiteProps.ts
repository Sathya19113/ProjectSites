import WebPartContext from "@microsoft/sp-webpart-base/lib/core/WebPartContext";

export interface IProjectSitesProps {
  description: string;
  context: WebPartContext;
  regionListName: string | number;
}
