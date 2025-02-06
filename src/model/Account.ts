import Model from "./Model";
import Portfolio from "./Portfolio";
import Skills from "./Skills";
import User from "./User";

class Account extends Model {
    user: User;
    skills: Skills;
    portfolio: Portfolio;

    constructor(data?: Record<string,any>){
        super();

        this.user = data?.user ? new User(data.user) : new User();
        this.skills = data?.skills ? new Skills(data.skills) : new Skills();
        this.portfolio = data?.projects ? new Portfolio(data.projects) : new Portfolio();
    }
}

export default Account;