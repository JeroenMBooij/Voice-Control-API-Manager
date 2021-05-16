import request from "supertest";
import { expect } from "chai";
import { TestMaster } from "./helpers/test-master.helper";
import * as DummyOrderRepository from "./dummy-repository/order.json";
import * as DummyUserRepository from "./dummy-repository/user.dummy";

var testMaster = TestMaster.getInstance();

describe('User Order tests', function() {

    before(async () => {
        testMaster.startServer();
        await testMaster.registerAdmin(DummyUserRepository.testadmin);
    });

    it("Get My admin's orders", async () => {
        await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.firstOrder);
        await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.secondOrder);

        await testMaster.registerAdmin(DummyUserRepository.secondtestadmin);
        await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.firstOrder);
        await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.secondOrder);

        await testMaster.registerUser(DummyUserRepository.testuser);
        let response = await testMaster.makeGetRequest("/orders/start/0/end/49");

        expect(response.body.total).to.eql(2);

    });

    it("Get order by id", async () => {
        testMaster.token = testMaster.admintoken;
        let orderResponse = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.thirdOrder);
        let orderId = orderResponse.body.orderId;
        
        let response = await testMaster.makeGetRequest(`/orders/${orderId}`);

        expect(response.body._id).to.eql(orderId);

    });

    it("Execute command", async () => {
        testMaster.token = testMaster.admintoken;
        await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.fourthOrder);
        
        let response = await testMaster.uploadFile("/orders/execute-voice-command", "voiceCommand", 
        "test/dummy-repository/command-files/redbonedog.wav");

        console.log(response.body);
    });

    after(async () => {
        await testMaster.stopServer();
    });
});

