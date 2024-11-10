export type CompanyType = {
  id: number;
  name: string;
};

export type CompaniesType = Array<CompanyType>;

export type SelectedCompaniesType = Array<number>

export type CompanyModalType = {
  open: boolean;
  id: number | null;
};