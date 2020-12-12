import React, { useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import GlobalStyles from "./globalStyles";
import Home from "./Home";
import AllPosts from "./AllPosts";
import PostForm from "./PostForm";
import PostDetails from "./PostDetails";
import AccountDetails from "./AccountDetails";
import PostsByCategory from "./PostsByCategory";
import MyPosts from "./MyPosts";
import Header from "./Header";
import SearchPage from "./Search";
import Edit from "./EditDeletePost";
import AppProvider from "./AppContext";

function App() {
  return (
    <Router>
      <AppProvider>
        <GlobalStyles />
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/all">
            <AllPosts />
          </Route>
          <Route exact path="/search">
            <SearchPage />
          </Route>
          <Route exact path="/createpost">
            <PostForm />
          </Route>
          <Route exact path="/posts/:postId">
            <PostDetails />
          </Route>
          <Route exact path="/user/:email">
            <AccountDetails />
          </Route>
          <Route exact path="/user/:email/:postId/edit">
            <Edit />
          </Route>
          <Route exact path="/user/:email/posts">
            <MyPosts />
          </Route>
          <Route exact path="/posts/bycategory/:category">
            <PostsByCategory />
          </Route>
        </Switch>
      </AppProvider>
    </Router>
  );
}

export default App;
