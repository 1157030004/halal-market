import brcypt from "bcryptjs"

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: brcypt.hashSync("123456", 10),
        isAdmin: true
    },
    {
        name: "Shadee",
        email: "shadee@example.com",
        password: brcypt.hashSync("123456", 10)
    },
    {
        name: "Lafea",
        email: "lafea@example.com",
        password: brcypt.hashSync("123456", 10)
    },
]

export default users