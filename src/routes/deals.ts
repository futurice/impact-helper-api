"use strict";

import Hapi from "@hapi/hapi";
import Joi from "joi";
import {  updateUid } from "../services/hubspot/company";
import {
  handleGetUprightProfile,
  handlePostDeal,
} from "../controllers/deal";

const deals = {
  name: "routes/deals",
  register: async function (server: Hapi.Server) {

    server.route({
      method: "POST",
      path: "/deals",
      handler: handlePostDeal,
      options: {
        validate: {
          payload: Joi.object({
            objectId: Joi.number().integer().required(),
          }),
          options: {
            allowUnknown: true,
          },
        },
      },
    });

    //to do: route for /webhook/hubspot/companies
    // check if UID exists



    
    server.route({
      method: "POST",
      path: "/webhook/slack/interactions",
      handler: updateUid,
      options: {
        validate: {
          payload: Joi.object({
            actions: Joi.array().required()
              .items({
                value: Joi.string().required()
              })
          }),
          options: {
            allowUnknown: true,
          }
        }
      }
    });

    server.route({
      method: "GET",
      path: "/deals/{id}/profile",
      handler: handleGetUprightProfile,
      options: {
        validate: {
          params: Joi.object({
            id: Joi.number().integer().required(),
          }),
        },
      },
    });
  }
}
    
        
export default deals;
