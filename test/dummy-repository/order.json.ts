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
          "value": "redbone"
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
          "value": "redbone"
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
          "value": "redbone"
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
          "value": "redbone"
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
          "value": "redbone"
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
          "value": "redbone"
        }
      ]
    }
  }

  export let travelOrder = {
    "price": 20,
    "command": "show travel locations to {location}",
    "action": {
      "host": "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "method": "GET",
      "requestLine": "/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query={location}",
      "queryParameters": [
        {
          "key": "location",
          "value": "Stockholm"
        }
      ],
      "headers": [
        {
          "key": "x-rapidapi-key",
          "value": "1140db894fmshf54643884726904p1853f4jsncbc3d5b0999f"
        },
        {
          "key": "x-rapidapi-host",
          "value": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
      ]
    }
  }
  
