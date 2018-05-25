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
*/
