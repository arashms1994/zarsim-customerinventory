export interface IPartListProductItem {
    BCod3: number;
    BCod3Name: string;
    Cmnt: string;
    EOQM: number | null;
    Feesh: number;
    ICod: number | null;
    KalaCCod: string;
    KalaCode: number;
    KalaName: string;
    Mandeh_M: number;
    Mandeh_T: number;
    Nam2: string;
    PartNumber: string | null;
    SumSader_M: number;
    SumSader_T: number;
    SumVared_M: number;
    SumVared_T: number;
}

export interface SharePointDeferred {
    __deferred: {
        uri: string;
    };
}

export interface ICustomerItem {
    AttachmentFiles: SharePointDeferred;
    Attachments: boolean;
    AuthorId: number;
    CUstomerType: string | null;
    CarCategory: boolean;
    Car_Coef: number | null;
    Carcategory_Code: string | null;
    City: string | null;
    Commission: number | null;
    ContentType: SharePointDeferred;
    ContentTypeId: string;
    Created: string;
    CustomerBrandName: string | null;
    CustomerCode: string;
    Date: string | null;
    EconomicNumber: string | null;
    EditorId: number;
    Email: string | null;
    FactoryAddress: string | null;
    FieldValuesAsHtml: SharePointDeferred;
    FieldValuesAsText: SharePointDeferred;
    FieldValuesForEdit: SharePointDeferred;
    File: SharePointDeferred;
    FileSystemObjectType: number;
    FirstUniqueAncestorSecurableObject: SharePointDeferred;
    Folder: SharePointDeferred;
    GUID: string;
    Genuine: boolean;
    GetDlpPolicyTip: SharePointDeferred;
    ID: number;
    Id: number;
    Introduction: string | null;
    Label: string | null;
    Legal: boolean;
    Mobile: string | null;
    Modified: string;
    NationalNumber: string | null;
    NonCarCategory: boolean;
    OData__UIVersionString: string;
    OData__x062a__x063a__x06cc__x06cc__x06: string | null;
    OfficeAddress: string | null;
    ParentList: SharePointDeferred;
    Permision: string;
    Permision2: string;
    Persenal: string | null;
    Phone: string | null;
    PostalCode: string | null;
    PurchaseProcedure: string | null;
    RegCode: string | null;
    RelatedPeople: string | null;
    Representationrequest: boolean;
    RoleAssignments: SharePointDeferred;
    SalesExpert: string | null;
    SalesExpertAcunt: string | null;
    SalesExpertAcunt_text: string | null;
    SalesExpertMobile: string | null;
    Shop: string | null;
    State: string | null;
    SupportExpert: string | null;
    SupportExpertAcunt: string | null;
    SupportExpertAcunt_text: string | null;
    Title: string;
    Updated: boolean;
    UserName: string | null;
    WebSite: string | null;
    adresshaml: string | null;
    darsadinfo: string | null;
    group_mahsol_1: string | null;
    group_mahsol_2: string | null;
    guid_form: string;
    last_Date_Info: string | null;
    last_Discript: string | null;
    last_status_info: string | null;
    namayandegi: boolean;
    namayandegi_k: string | null;
    other: string | null;
    rateinfo: string | null;
    telephonhaml: string | null;
}

export interface IInventoryTableProps {
    isInitialLoad?: boolean;
    data: IPartListProductItem[];
}
export type SortOrder = "asc" | "desc";
export type SortKey = "BCod3Name" | "KalaName" | "Mandeh_T";