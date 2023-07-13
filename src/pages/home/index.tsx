import { HomeContainer, HomeContent, TitleHeader } from './indexElements'; 

const Home = () => {
    return (
         <HomeContainer>
            <HomeContent>
                <TitleHeader>body 1</TitleHeader>
            </HomeContent>
            <HomeContent>
                <TitleHeader>body 2</TitleHeader>
            </HomeContent>
         </HomeContainer>
    );
    }

export default Home;