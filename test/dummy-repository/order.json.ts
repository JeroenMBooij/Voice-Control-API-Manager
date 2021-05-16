import { Endpoint } from "../../src/models/endpoint.model";
import { OrderMap } from "../../src/models/maps/order.map";
import { Parameter } from "../../src/models/parameter.model";

export let firstOrder = {
    "price": 1,
    "command": "Show me a {breed} doggie",
    "action": {
      "host": "https://dog.ceo",
      "method": "GET",
      "requestLine": "/api/breed/{breed}/images/random",
      "queryParameters": [
        {
          "key": "breed",
          "value": "beagle"
        }
      ]
    }
  }

export let secondOrder = {
    "price": 1,
    "command": "Show me a {breed} cat",
    "action": {
      "host": "https://dog.ceo",
      "method": "GET",
      "requestLine": "/api/breed/{breed}/images/random",
      "queryParameters": [
        {
          "key": "breed",
          "value": "beagle"
        }
      ]
    }
  }

  export let thirdOrder = {
    "price": 1,
    "command": "Show me a {breed} test",
    "action": {
      "host": "https://dog.ceo",
      "method": "GET",
      "requestLine": "/api/breed/{breed}/images/random",
      "queryParameters": [
        {
          "key": "breed",
          "value": "beagle"
        }
      ]
    }
  }

  export let fourthOrder = {
    "price": 1,
    "command": "Show me a {breed} dog",
    "action": {
      "host": "https://dog.ceo",
      "method": "GET",
      "requestLine": "/api/breed/{breed}/images/random",
      "queryParameters": [
        {
          "key": "breed",
          "value": "beagle"
        }
      ]
    }
  }

  export let orderWithNumbers = {
    "price": 1,
    "command": "Show me a {breed} test12",
    "action": {
      "host": "https://dog.ceo",
      "method": "GET",
      "requestLine": "/api/breed/{breed}/images/random",
      "queryParameters": [
        {
          "key": "breed",
          "value": "beagle"
        }
      ]
    }
  }

  export let orderWithSpacesInParameter = {
    "price": 1,
    "command": "Show me a {bre ed} test",
    "action": {
      "host": "https://dog.ceo",
      "method": "GET",
      "requestLine": "/api/breed/{bre ed}/images/random",
      "queryParameters": [
        {
          "key": "bre ed",
          "value": "beagle"
        }
      ]
    }
  }
  
