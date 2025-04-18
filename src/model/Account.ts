import Model from './Model';
import Portfolio from './Portfolio';
import Skills from './Skills';
import User from './User';

class Account {
  skills: Skills;
  portfolio: Portfolio | null;

  constructor(data?: Record<string, any>) {
    this.skills = data?.skills ? new Skills(data.skills) : new Skills();
    this.portfolio = data?.projects ? new Portfolio(data.projects) : null;
  }
}

export default Account;
