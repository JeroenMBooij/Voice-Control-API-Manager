import { expect } from "chai";
import { TestMaster } from "./helpers/test-master.helper";
import * as AppUser from "../src/common/constants/user.constants";
import * as DummyUserRepository from "./dummy-repository/user.dummy";
import * as DummyOrderRepository from "./dummy-repository/order.json";
import { InvoiceMap } from "../src/models/maps/invoice.map";

var testMaster = TestMaster.getInstance();

describe('Funds tests', function() {

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

        expect(invoiceResponse.status).to.eql(200);
    });

    it("Exhaust Execute Order", async () => {
        await testMaster.registerAdmin(DummyUserRepository.secondtestadmin);
        let orderResponse = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.fourthOrder);
        let orderId = orderResponse.body.orderId;
        let invoice = new InvoiceMap();
        invoice.orderId = orderId;

        await testMaster.registerUser(DummyUserRepository.secondtestuser);
        await testMaster.makePostRequest("/invoices/purchase", invoice);
        for(let i = 0; i <= AppUser.DEFAULT_CALL_AMOUNT; i++)
        {
            let response = await testMaster.uploadFile("/orders/execute-voice-command", "voiceCommand", 
            "test/dummy-repository/command-files/redbonedog.wav");

            if(i < AppUser.DEFAULT_CALL_AMOUNT)
                expect(response.body.status).to.eql("success");
            else  
                expect(response.body.message).to.eql("No more calls left for show me a beagle dog");
        }
    });


    after(async () => {
        testMaster.stopServer();
    });
});

