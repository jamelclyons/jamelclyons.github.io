class Project {
  id: string = '';
  title: string = '';
  status: string = '';
  types: Array<string> = [];
  description: string = '';
  slug: string = '';
  design: Array<string> = [];
  designCheckList: Array<string> = [];
  designGallery: Array<string> = [];
  colorsList: Array<string> = [];
  development: Array<string> = [];
  developmentCheckList: Array<string> = [];
  repoURL: string = '';
  versionsList: Array<string> = [];
  languages: Array<string> = [];
  frameworks: Array<string> = [];
  technologies: Array<string> = [];
  delivery: Array<string> = [];
  deliveryGallery: Array<string> = [];
  deliveryCheckList: Array<string> = [];
  problem: Array<string> = [];
  problemGallery: Array<string> = [];
  solution: Array<string> = [];
  solutionGallery: Array<string> = [];
  urlsList: Array<string> = [];
  detailsList: Array<string> = [];
  teamList: Array<string> = [];
  clientID: Array<string> = [];

  constructor(data: Record<string, any> = {}) {
    this.id = data?.id || '';
    this.title = data?.title || '';
    this.status = data?.status || '';
    this.types = data?.types || '';
    this.description = data?.description || '';
    this.slug = data?.slug || '';
    this.design = data?.design || [];
    this.designCheckList = data?.design_check_list || [];
    this.designGallery = data?.design_gallery || [];
    this.colorsList = data?.colors_list || [];
    this.development = data?.development || [];
    this.developmentCheckList = data?.development_check_list || [];
    this.repoURL = data?.repo_url || '';
    this.versionsList = data?.versions_list || [];
    this.languages = data?.languages || [];
    this.frameworks = data?.frameworks || [];
    this.technologies = data?.technologies || [];
    this.delivery = data?.delivery || [];
    this.deliveryGallery = data?.delivery_gallery || [];
    this.deliveryCheckList = data?.delivery_check_list || [];
    this.problem = data?.problem || [];
    this.problemGallery = data?.problem_gallery || [];
    this.solution = data?.solution || [];
    this.solutionGallery = data?.solution_gallery || [];
    this.urlsList = data?.urls_list || [];
    this.detailsList = data?.details_list || [];
    this.teamList = data?.team_list || [];
    this.clientID = data?.client_id || '';
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      status: this.status,
      types: this.types,
      description: this.description,
      slug: this.slug,
      design: this.design,
      design_check_list: this.designCheckList,
      design_gallery: this.designGallery,
      colors_list: this.colorsList,
      development: this.development,
      development_check_list: this.developmentCheckList,
      repo_url: this.repoURL,
      versions_list: this.versionsList,
      languages: this.languages,
      frameworks: this.frameworks,
      technologies: this.technologies,
      delivery: this.delivery,
      delivery_gallery: this.deliveryGallery,
      delivery_check_list: this.deliveryCheckList,
      problem: this.problem,
      problem_gallery: this.problemGallery,
      solution: this.solution,
      solution_gallery: this.solutionGallery,
      urls_list: this.urlsList,
      details_list: this.detailsList,
      team_list: this.teamList,
      client_id: this.clientID
    };
  }
}

export default Project;
