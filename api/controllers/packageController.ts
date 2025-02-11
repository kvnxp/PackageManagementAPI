import { Request, Response } from "express";
import { Package } from "../struct/packageStruct";
import { PackageStateEnum } from "../enums/packageStateEnum";
import { Tools } from "../misc/Tools";
import { SQL } from "../server/mysqlManager";
import { converToSQLInsert } from "../misc/createSQLInsert";
import { ErrorMessage, responseStruct } from "../struct/responseStruct";
import { UserQueryList } from "../sql/userQuery";
import { MessageList } from "../misc/messageList";
import { validateAddress } from "../misc/addressValidator";
import { User } from "../struct/userStruct";
import { PackagesQuery } from "../sql/packagesQuery";

export class PackageController {
    public static async getPackageList(req: any, res: any, next: any) {

        const param = req.query;

        const queryRoot = PackagesQuery.PACKAGE_LIST;
        let queryList = [];
        let values = [];
        if (param.id) {
            queryList.push(`id = ${param.id}`);
        }

        if (param.senderIdCard) {
            queryList.push(`senderIdCard = ${param.senderIdCard}`);
        }

        if (param.reciverIdCard) {
            queryList.push(`reciverIdCard = ${param.reciverIdCard}`);
        }

        if (param.packageState) {
            queryList.push(`packageState = ${param.packageState}`);
        }

        if (param.vehicleId) {
            queryList.push(`vehicleId = ${param.vehicleId}`);
        }

        let queryResult = Tools.queryConcat(queryRoot, queryList);
        queryResult += " ORDER BY createdAt DESC";

        try {
            const result = await SQL.promise().query(queryResult);
            res.send(new responseStruct("ok", "", 200, result[0]));

        } catch (error) {
            next(error);
        }
    }

    public static async createPackage(req: Request, res: Response, next: any) {

        try {
            const packageData = await new Package(req.body)
            packageData.id = await Tools.generateRandomNumber();

            const addressResult = await validateAddress(packageData.reciverAddress! + " " + packageData.reciverCity! + " " + packageData.reciverCountry!);

            if (packageData.reciverCountry?.toLocaleLowerCase().includes(addressResult.components.country.toLocaleLowerCase()) === false) {
                throw new Error("Invalid country for reciver address");
            }
            if (packageData.reciverCity?.toLocaleLowerCase().includes(addressResult.components.town.toLocaleLowerCase()) === false) {
                throw new Error("Invalid state for reciver address");
            }

            packageData.id = await Tools.generateRandomNumber();
            packageData.packageState = PackageStateEnum.Pending;

            const userQuery: any = await SQL.promise().query(UserQueryList.SELECT_USER_BY_IDCARD, [packageData.senderIdCard]);

            if (userQuery[0].length === 0) {
                next(new ErrorMessage("error", MessageList.USER_NOT_FOUND, 404));
                throw new Error(MessageList.USER_NOT_FOUND);
            }

            const userData: User = userQuery[0][0];
            packageData.senderAddress = packageData.senderAddress == "" ? userData.address : packageData.senderAddress;
            packageData.senderName = packageData.senderName == "" ? userData.firstName + " " + userData.lastName : packageData.senderName;
            packageData.senderPhone = packageData.senderPhone == 0 ? userData.phone : packageData.senderPhone;
            packageData.senderCity = packageData.senderCity == "" ? userData.city : packageData.senderCity;
            packageData.senderCountry = packageData.senderCountry == "" ? userData.country : packageData.senderCountry;
            packageData.senderPostalCode = packageData.senderPostalCode == 0 ? userData.postalCode : packageData.senderPostalCode;

            const query = converToSQLInsert(packageData, 'packages');
            const result = await SQL.promise().query(query.query, query.values);

            res.send(new responseStruct("ok", "", 200, packageData));

        } catch (error) {
            next(error);
        }
    }
    public static updatePackage(req: any, res: any) {
        res.send('PackageController updatePackage');
    }

}