export class UserQueryList{

    public static readonly SELECT_ALL_USERS = "SELECT * FROM users";
    public static readonly SELECT_USER_BY_ID = "SELECT * FROM users WHERE id = ?";
    public static readonly SELECT_USER_BY_IDCARD = "SELECT * FROM users WHERE idCard = ?";
    public static readonly SELECT_USER_BY_EMAIL = "SELECT * FROM users WHERE email = ?";
   
    // public static readonly INSERT_USER = "INSERT INTO users (email, password) VALUES (?, ?)";
    // public static readonly UPDATE_USER = "UPDATE users SET email = ?, password = ? WHERE id = ?";
    // public static readonly DELETE_USER = "DELETE FROM users WHERE id = ?";
}