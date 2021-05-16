import { expect } from "chai";
import { TestMaster } from "./helpers/test-master.helper";
import * as AppUser from "../src/common/constants/user.constants";
import * as DummyOrderRepository from "./dummy-repository/order.json";
import * as DummyUserRepository from "./dummy-repository/user.dummy";
import { Balance } from "../src/models/balance.model";

var testMaster = TestMaster.getInstance();

describe('Funds tests', function() {

    before(async() => {
        testMaster.startServer();
        await testMaster.registerAdmin(DummyUserRepository.testadmin);
    });

    it("check registration funds", async () => {
        let response = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.firstOrder);
        let orderId = response.body.
        expect(response.body).to.eql(AppUser.REGISTRATION_BONUS);
    });

    it("increase balance", async () => {
        let deposit = new Balance()
        deposit.value = 6;

        await testMaster.registerAdmin(DummyUserRepository.secondtestadmin);
        await testMaster.makePostRequest("/funds/deposit", deposit);
        let response = await testMaster.makeGetRequest("/funds/balance");
        expect(response.body).to.eql(AppUser.REGISTRATION_BONUS + deposit.value);
    });


    after(async () => {
        testMaster.stopServer();
    });
});

