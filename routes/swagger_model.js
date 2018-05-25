/**
* @swagger
* Profile:
*    type: "object"
*    properties:
*      profileId:
*        type: "integer"
*        format: "int32"
*      profileCode:
*        type: "string"
*      profileDescription:
*        type: "string"
* Order:
*    type: "object"
*    properties:
*      orderId:
*        type: "integer"
*        format: "int32"
*      orderPrice:
*        type: "string"
*      orderDate:
*        type: "string"
* User:
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
*/