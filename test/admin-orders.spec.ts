import { expect } from "chai";
import { TestMaster } from "./helpers/test-master.helper";
import * as DummyOrderRepository from "./dummy-repository/order.json";
import * as DummyUserRepository from "./dummy-repository/user.dummy";
import { Order } from "../src/models/order.model";
import { Console } from "console";

var testMaster = TestMaster.getInstance();

describe('Admin Order tests', function() {

    before(async () => {
        testMaster.startServer();
        await testMaster.registerAdmin(DummyUserRepository.testadmin);
    });

    it("create first order", async () => {
        let response = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.firstOrder);

        expect(response.body.challenge.status).to.eql("success");
    });

    it("create order with numbers", async () => {
        let response = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.orderWithNumbers);

        expect(response.body.message).to.eql("Order validation failed: command: A command can only contain the letters a-z and spaces");
    });

    it("create order with spaces inside parameter", async () => {
        let response = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.orderWithSpacesInParameter);

        expect(response.body.message).to.eql("Order validation failed: command: A command parameter can not contain spaces");
    });

    it("create second order", async () => {
        let response = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.secondOrder);
        
        expect(response.body.challenge.status).to.eql("success");
    });

    it("create second order again", async () => {
        let response = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.secondOrder);
        
        expect(response.status).to.eql(500);
    });

    it("Get Orders", async () => {

        await testMaster.registerAdmin(DummyUserRepository.secondtestadmin);

        await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.firstOrder);
        await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.secondOrder);
        
        let stupidresponse = await testMaster.makeGetRequest("/orders/start/0/end/49");
        let firstresponse = await testMaster.makeGetRequest("/orders/start/0/end/49");
        let secondresponse = await testMaster.makeGetRequest("/orders/start/0/end/1");
        let thirdresponse = await testMaster.makeGetRequest("/orders/start/0/end/0");

        expect(firstresponse.body.orders.length).to.eql(2);
        expect(secondresponse.body.orders.length).to.eql(2);
        expect(thirdresponse.body.orders.length).to.eql(1);
    });

    it("update order", async () => {
        let createOrderResponse = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.thirdOrder);
        let orderId = createOrderResponse.body.orderId;
        
        let updatedOrder: Order = (DummyOrderRepository.secondOrder as any);
        updatedOrder.price = 10;

        await testMaster.makePutRequest(`/admin/commands/update/${orderId}`, updatedOrder);

        let orderResponse = await testMaster.makeGetRequest(`/orders/${orderId}`);
        let order: Order = orderResponse.body;

        expect(order.price).to.eql(10);
    });

    it("delete order", async () => {
        let createOrderResponse = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.travelOrder);
        let orderId = createOrderResponse.body.orderId;

        await testMaster.makeDeleteRequest(`/admin/commands/delete/${orderId}`);

        let orderResponse = await testMaster.makeGetRequest(`/orders/${orderId}`);

        expect(orderResponse.status).to.eql(400);
    });

    after(async () => {
        await testMaster.stopServer();
    });
});

