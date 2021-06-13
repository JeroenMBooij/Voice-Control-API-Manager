import { expect } from "chai";
import { TestMaster } from "./helpers/test-master.helper";
import * as DummyOrderRepository from "./dummy-repository/order.json";
import * as DummyUserRepository from "./dummy-repository/user.dummy";


var testMaster = TestMaster.getInstance();

describe('Order Headers tests', function() {

    before(async() => {
        testMaster.startServer();
        await testMaster.registerAdmin(DummyUserRepository.testadmin);
    });

    it("Three levels deep test", async () => {

        let orderResponse = await testMaster.makePostRequest("/admin/commands/create", DummyOrderRepository.travelOrder);
        let orderId = orderResponse.body.orderId;

        let userResponse = await testMaster.makeGetRequest("/admins/get/id");
        let userId = userResponse.body;

        let response = await testMaster.makeGetRequest(`/admins/${userId}/orders/${orderId}/header/x-rapidapi-host`);

        expect(response.body).to.eql("skyscanner-skyscanner-flight-search-v1.p.rapidapi.com");
    });


    after(async () => {
        testMaster.stopServer();
    });
});

