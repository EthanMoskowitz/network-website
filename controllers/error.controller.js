const errorHandler = (req, res) => {
    if (req.error) {
        switch (req.error) {
            case 400:
                res.cookie("error", "Bad Request. Try again.", { maxAge: 1000 });
                res.redirect("/login-page");
                break;
            case 401:
                res.cookie("error", "Login to have full access.", { maxAge: 1000 });
                res.redirect("/login-page");
                break;
            case 403:
                res.cookie("error", "Forbidden. Log out and try again.", { maxAge: 1000 });
                res.redirect("/login-page");
                break;
            default:
                res.cookie("error", "There was an error.", { maxAge: 1000 });
                res.redirect("/");
                break;
        }
    } else {
        res.redirect("/");
    }
};

export default errorHandler;