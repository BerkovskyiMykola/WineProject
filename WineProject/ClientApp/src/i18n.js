import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(LanguageDetector).init({
    // we init with resources
    resources: {
        en: {
            translations: {
                Email: "Email",
                Firstname: "First name",
                Lastname: "Last name",
                Password: "Password",
                SignUp: "Sign Up",
                Home: "Home",
                Profile: "Profile",
                LogOut: "LogOut",
                Login: "Login",
                Role: "Role",
                Actions: "Actions",
                ListEmpty: "List is empty",
                Create: "Create",
                Edit: "Edit",
                Delete: "Delete",
                CreateBackup: "Create Backup",
                RestoreDatabase: "Restore Вatabase",
                Users: "Users",
                Barrels: "Barrels",
                sort: "Sort",
                amountMonth: "Number of months of patience",
                dateStart: "Date Start",
                Measurements: "Measurements",
                Temperature: "Temperature",
                SugarContent: "Sugar content",
                Transparency: "Transparency",
                AlcoholContent: "Alcohol content",
                Acidity: "Acidity",
                Weight: "Weight",
                DateTime: "Date and time",
                "All OK": "All OK",
                "Barrel": "Barrel",
                "needs topping up": "needs topping up",
                "History": "History",
                "Donate": "Donate",
                "Get VIP": "Get VIP",

                "This field is required!": "This field is required!",
                "This is not a valid email. Example: example@example.com": "This is not a valid email. Example: example@example.com",
                "The field must be between 2 and 30 characters.": "The field must be between 2 and 30 characters.",
                "The field must be between 10 and 256 characters.": "The field must be between 10 and 256 characters.",
                "The password must be between 8 and 18 characters.": "The password must be between 8 and 18 characters.",

                "Bad Request": "Bad Request",
                "Not Found": "Not Found",
                "User with such Email exists": "User with such Email exists",
                "Email or password is incorrect": "Email or password is incorrect",
                "One or more validation errors occurred.": "One or more validation errors occurred.",
            }
        },
        ua: {
            translations: {
                Email: "Пошта",
                Firstname: "Ім'я",
                Lastname: "Прізвище",
                Password: "Пароль",
                SignUp: "Зареєструватись",
                Home: "Домашня сторінка",
                Profile: "Профіль",
                LogOut: "Вийти",
                Login: "Ввійти",
                Role: "Роль",
                Actions: "Дії",
                ListEmpty: "Список пустий",
                Create: "Створити",
                Edit: "Редагувати",
                Delete: "Видалити",
                CreateBackup: "Створити резервну копію",
                RestoreDatabase: "Відновити базу даних",
                Users: "Користувачі",
                Barrels: "Бочки",
                sort: "Сорт",
                amountMonth: "Кількість місяців витримки",
                dateStart: "Дата початку",
                Measurements: "Виміри",
                Temperature: "Температура",
                SugarContent: "Вміст цукру",
                Transparency: "Прозрачність",
                AlcoholContent: "Вміст алкоголю",
                Acidity: "Кислотність",
                Weight: "Маса",
                DateTime: "Дата й час",
                "All OK": "Все ок",
                "Barrel": "Бочка",
                "needs topping up": "потребує долив",
                "History": "Історія",
                "Donate": "Донат",
                "Get VIP": "Отримати VIP",

                "This field is required!": "Це поле необхідне!",
                "This is not a valid email. Example: example@example.com": "Це не валідна пошта. Наприклад: example@example.com",
                "The field must be between 2 and 30 characters.": "Поле має містити від 2 до 30 символів.",
                "The field must be between 10 and 256 characters.": "Поле має містити від 10 до 256 символів.",
                "The password must be between 8 and 18 characters.": "Пароль має містити від 8 до 18 символів.",

                "Bad Request": "Поганий запит",
                "Not Found": "Не знайдено",
                "User with such Email exists": "Користувач із такою електронною поштою існує",
                "Email or password is incorrect": "Електронна адреса або пароль неправильні",
                "One or more validation errors occurred.": "Сталася одна чи кілька помилок перевірки.",
            }
        }
    },
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        useSuspense: false,
    }
});

export default i18n;
