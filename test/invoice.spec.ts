import { expect } from "chai";
import { TestMaster } from "./helpers/test-master.helper";
import * as AppUser from "../src/common/constants/user.constants";
import * as DummyUserRepository from "./dummy-repository/user.dummy";
import * as DummyOrderRepository from "./dummy-repository/order.json";
import { InvoiceMap } from "../src/models/maps/invoice.map";

var testMaster = TestMaster.getInstance();

describe('Invoice tests', function() {

    before(async() => {
        testMaster.startServer();
        await testMaster.registerAdmin(DummyUserRepository.testadmin);
    });

    
    it("Purchase Order", async () => {
        testMaster.token = testMaster.admintoken;
        let orderResponse = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.firstOrder);
        let orderId = orderResponse.body.orderId;
        let invoice = new InvoiceMap();
        invoice.orderId = orderId;

        await testMaster.registerUser(DummyUserRepository.testuser);
        let invoiceResponse = await testMaster.makePostRequest("/invoices/purchase", invoice);

        expect(invoiceResponse.status).to.eql(204);
    });

    it("Insufficient funds", async () => {
        testMaster.token = testMaster.admintoken;
        let orderResponse = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.travelOrder);
        let orderId = orderResponse.body.orderId;
        let invoice = new InvoiceMap();
        invoice.orderId = orderId;

        await testMaster.registerUser(DummyUserRepository.testuser);
        let invoiceResponse = await testMaster.makePostRequest("/invoices/purchase", invoice);

        expect(invoiceResponse.status).to.eql(400);
    });

    after(async () => {
        testMaster.stopServer();
    });
});

