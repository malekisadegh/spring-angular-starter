import { ParamModel } from '../public/param.model';

export class CollateralDocumentModel {
  docSelect: ParamModel;
  docSelectCode: number;
  fileSelect: FileSnippetModel;
  fileSelectString: string;
  changeFile: boolean = false;
  /**
   * Local Use
   */
  type: string;
}

export class FileSnippetModel {
  constructor(public src: string, public file: File) {}
}
