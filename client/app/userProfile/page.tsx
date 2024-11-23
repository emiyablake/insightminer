import { NextPage } from "next"
import Header from "../Components/Header/Header"
import Footer from "../Components/Footer/Footer"

const UserProfile: NextPage = () => {
    return (
        <div>
            <Header />
            <main>
                <h1>User Profile</h1>
            </main>
            <Footer />
        </div>
    )
}

export default UserProfile;