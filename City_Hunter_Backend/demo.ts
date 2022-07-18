// The uses of Omit:

let student: Student = {

    name: "Dickson",
    age: 20,
    lang: "JAVA",
    password: "i love james"
}

// let { password, ...studentWithoutPw } = student
// studentWithoutPw.name = 'Ben'
// console.log('student = ', student)

// console.log('password = ', password);
// console.log('studentWithoutPw = ', studentWithoutPw);

interface Student {
    name: string
    age: number
    lang: string,
    level: number
    password: string
}

// Omit<Type, Keys>
// Constructs a type by picking all properties from Type and then 
// removing Keys (string literal or union of string literals).
type StudentWithoutPw = Omit<Student, 'password'>

function updateProfile(profile: Student) {
    let filteredProfile = {
        ...profile
    }


    delete filteredProfile.password


    console.log({ profile })
    console.log({ filteredProfile })
    console.log({ student })


}

updateProfile(student)