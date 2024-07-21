import './App.css';
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom'
import SignUp from './components/SignUp/SignUp'
import Home from './components/Home/Home'
 import Feedback from './components/Feedback/Feedback';
 import MainHeader from './components/MainHeader/MainHeader';
 import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
 import client from './utils/apolloClient';
 import Message from './components/Message/Message';
 
function App() {
  return (
<Router>
<ApolloProvider client ={client}>
    <Routes>
<Route path ='/' element ={<SignUp/>}/>
<Route path='Home' element={<MainHeader/>}>
<Route index element={<Home/>}/>
<Route path='Home1' element={<Home/>}/>
<Route path='Feedback' element={<Feedback/>}/>
<Route path='Message' element={<Message/>}/>
</Route>
   </Routes>
   </ApolloProvider>
   </Router>
   
  );
}

export default App;
