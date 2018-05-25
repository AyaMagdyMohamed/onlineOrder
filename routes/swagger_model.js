/**
* @swagger
* definitions:
*  User:
*    type: "object"
*    properties:
*      userId:
*        type: "integer"
*        format: "int32"
*      profile:
*        $ref: "#/definitions/Profile"
*      userName:
*        type: "string"
*      password:
*        type: "string"
*  Profile:
*    type: "object"
*    properties:
*      profileId:
*        type: "integer"
*        format: "int32"
*      profileCode:
*        type: "string"
*      profileDescription:
*        type: "string"
*  Credentials:
*    type: "object"
*    properties:
*      username:
*        type: "string"
*      password:
*        type: "string"
*  Order:
*    type: "object"
*    properties:
*      orderId:
*        type: "integer"
*        format: "int32"
*      orderPrice:
*        type: "string"
*      orderDate:
*        type: "string"
*        format: "date-time"
*      user:
*        $ref: "#/definitions/User"
*  AccessToken:
*    type: "object"
*    properties:
*      accessToken:
*        type: "string"
*      accessTokenType:
*        type: "string"
*      expiresOn:
*        type: "string"
*        format: "date-time"
*/
