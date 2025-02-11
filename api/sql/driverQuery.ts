export class DriverQuery {

    // public static DRIVER_BY_IDCARD = `SELECT * FROM user WHERE idCard = ?`;
    public static DRIVER_LIST = `SELECT * FROM users WHERE role = ?`;
    public static DRIVER_BY_ID = `SELECT * FROM users WHERE role = ? AND idCard = ?`;
}