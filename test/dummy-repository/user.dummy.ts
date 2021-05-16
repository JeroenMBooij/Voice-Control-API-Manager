import { UserMap } from "../../src/models/maps/user.map";

let testadmin = new UserMap();
testadmin.email = "admin@test.test";
testadmin.password = "test";
testadmin.firstname = "admintester";
testadmin.language = "nl-NL";

export { testadmin };

let secondtestadmin = new UserMap();
secondtestadmin.email = "admin2@test.test";
secondtestadmin.password = "test2";
secondtestadmin.firstname = "admintester2";
secondtestadmin.language = "nl-NL";

export { secondtestadmin };

let testuser = new UserMap();
testuser.email = "user@test.test";
testuser.password = "user";
testuser.firstname = "usertester";

export { testuser };

let secondtestuser = new UserMap();
secondtestuser.email = "user2@test.test";
secondtestuser.password = "user2";
secondtestuser.firstname = "usertester2";

export { secondtestuser };
