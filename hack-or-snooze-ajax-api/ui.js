$(async function () {
  // cache some selectors we'll be using quite a bit
  const $allStoriesList = $("#all-articles-list");
  const $submitForm = $("#submit-form");
  const $filteredArticles = $("#filtered-articles");
  const $loginForm = $("#login-form");
  const $createAccountForm = $("#create-account-form");
  const $ownStories = $("#my-articles");
  const $navLogin = $("#nav-login");
  const $navLogOut = $("#nav-logout");
  const $navSubmitStory = $("#nav-submit-story");
  const $mainNavLinks = $(".main-nav-links");
  const $favArticles = $("#favorited-articles");
  const $homeButton = $(".home-button");

  // global storyList variable
  let storyList = null;

  // global currentUser variable
  let currentUser = null;

  await checkIfLoggedIn();

  /**
   * On page load, checks local storage to see if the user is already logged in.
   * Renders page information accordingly.
   */

  async function checkIfLoggedIn() {
    // let's see if we're logged in
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    // if there is a token in localStorage, call User.getLoggedInUser
    //  to get an instance of User with the right details
    //  this is designed to run once, on page load
    currentUser = await User.getLoggedInUser(token, username);
    await generateStories();

    if (currentUser) {
      showNavForLoggedInUser();
    }

    /**
     * Event listener for logging in.
     *  If successfully we will setup the user instance
     */

    $loginForm.on("submit", async function (evt) {
      evt.preventDefault(); // no page-refresh on submit

      // grab the username and password
      const username = $("#login-username").val();
      const password = $("#login-password").val();

      // call the login static method to build a user instance
      const userInstance = await User.login(username, password);
      // set the global user to the user instance
      currentUser = userInstance;
      syncCurrentUserToLocalStorage();
      loginAndSubmitForm();
      generateStories();
    });

    /**
     * Event listener for signing up.
     *  If successfully we will setup a new user instance
     */

    // Create new user account on hack-or-snooze
    $createAccountForm.on("submit", async function (evt) {
      evt.preventDefault(); // no page refresh

      // grab the required fields
      let name = $("#create-account-name").val();
      let username = $("#create-account-username").val();
      let password = $("#create-account-password").val();

      try {
        // call the create method, which calls the API and then builds a new user instance
        const newUser = await User.create(username, password, name);
        currentUser = newUser;
        syncCurrentUserToLocalStorage();
        loginAndSubmitForm();
      } catch {
        // if login fails inform the user to try again with popup
        const $div = $(`
        <div class='popup'>
          <span class="popuptext" id="myPopup">Try Again</span>
        </div>
            `);
        $("#create-account-form").prepend($div);
        throw "Username already exists, please try again";
      }
    });

    /**
     * Log Out Functionality
     */

    $navLogOut.on("click", "#out", function () {
      // empty out local storage
      localStorage.clear();
      // refresh the page, clearing memory
      location.reload();
    });

    /**
     * Event Handler for Clicking Login
     */

    $navLogin.on("click", function () {
      // Show the Login and Create Account Forms
      $loginForm.slideToggle();
      $createAccountForm.slideToggle();
      $allStoriesList.slideToggle();
    });

    $("#verify-button").on("click", verifyUser);

    // allow global access to timer
    let timeout;

    // verify user to edit profile
    async function verifyUser(
      evt,
      user = currentUser.username,
      pass = $("#verify-pass").val()
    ) {
      evt.preventDefault();
      $("#verify").slideToggle();
      if (pass) {
        // verify password by logging user in again
        const verified = await User.login(user, pass, true);
        if (verified === 200) {
          // if verified then allow user to edit profile info form
          $(".pro > input").prop("disabled", false);
          $(".pro > input").css("background-color", "#ff6600");
          const editProfile = document.querySelector("#edit-profile");
          editProfile.removeEventListener("click", verifyProfile);
          editProfile.innerText = "Update";
          editProfile.addEventListener("click", updateProfile);
          $("#pass").val(pass);
          timeout = setTimeout(function () {
            $(".pro >input").prop("disabled", true);
          }, 10000);
        }
      }
    }

    // Send updated info for profile update server with new profile info
    async function updateProfile() {
      const pass = $("#pass").val();
      const uName = $("#u-name").val();
      const pName = $("#p-name").val();
      const token = currentUser.loginToken;
      $("#verify").trigger("reset");
      const updatedUser = await User.updateUser(pass, uName, pName, token);
      currentUser = await User.getLoggedInUser(token, uName);

      // parse creation date info to make read-able on user profile
      $("#c-date").text(
        currentUser.createdAt
          .split("")
          .slice(0, 19)
          .join("")
          .replace(",", " ")
          .replace("T", " ")
          .concat("GMT")
      );
      // parse date for last update to profile to make easier to read
      $("#u-date").text(
        currentUser.updatedAt
          .split("")
          .slice(0, 19)
          .join("")
          .replace(",", " ")
          .replace("T", " ")
          .concat("GMT")
      );

      // handle button for updating profile once user is verified
      const editProfile = document.querySelector("#edit-profile");
      editProfile.innerText = "Edit Profile";
      editProfile.removeEventListener("click", updateProfile);
      editProfile.addEventListener("click", verifyProfile);
      $(".pro > input").prop("disabled", true);
      $(".pro > input").css("background-color", "#fff");
      clearTimeout(timeout);
    }

    // Show form for submitting new story
    $navSubmitStory.on("click", function () {
      $mainNavLinks.hide();
      $homeButton.show();
      $("#article-form").slideToggle();
      $allStoriesList.slideToggle();
    });

    // Add event listener to add story to DOM
    $("#article-form button").on("click", async function (evt) {
      evt.preventDefault();

      if (!checkIfLoggedIn()) return;
      const title = $("#title").val();
      const url = $("#url").val();
      const hostName = getHostName(url);
      const author = $("#author").val();
      const username = currentUser.username;
      const token = currentUser.loginToken;

      const newStory = await storyList.addStory(currentUser, {
        title,
        author,
        url,
        username,
      });

      // create a new li item to append to story list
      const $li = $(`
      <li id="${newStory.storyId}" class="id-${newStory.storyId}">
         <span class="heart">
          <i class="far fa-heart"></i>
        </span>
        <a class="article-link" href="${url}" target="a_blank">
          <strong>${title}</strong>
        </a>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        <small class="article-author">by ${author}</small>
        <small class="article-username">posted by ${username}</small>
      </li>
    `);
      // Prepend new story to list of stories
      $allStoriesList.prepend($li);

      // hide the form and reset it
      $("#article-form").slideToggle();
      $("#article-form").trigger("reset");
      $allStoriesList.slideToggle();
      $homeButton.hide();
      currentUser = await User.getLoggedInUser(token, username);
    });

    /**
     * Event handler for Navigation to Homepage
     */

    // Reload the website by clicking on the logo
    $("body").on("click", "#nav-all", async function () {
      location.reload();
    });
    console.log(currentUser);

    // Open profile from navbar to see or update user info
    $("body").on("click", "#user", async function () {
      $(".edit").hide();
      $(".trash").hide();
      $favArticles.hide();
      $ownStories.hide();
      $submitForm.hide();
      $("#article-form").hide();
      $("#verify").hide();
      $homeButton.hide();
      $("#user-profile").is(":visible")
        ? $allStoriesList.slideDown() && $mainNavLinks.show()
        : $allStoriesList.slideUp() && $mainNavLinks.hide();
      $("#user-profile").slideToggle();
      $("#p-name").val(currentUser.name);
      $("#u-name").val(currentUser.username);
      $("#pass").val("********");
      $("#c-date").text(
        currentUser.createdAt
          .split("")
          .slice(0, 19)
          .join("")
          .replace(",", " ")
          .replace("T", " ")
          .concat("GMT")
      );
      $("#u-date").text(
        currentUser.updatedAt
          .split("")
          .slice(0, 19)
          .join("")
          .replace(",", " ")
          .replace("T", " ")
          .concat("GMT")
      );
      const editProfile = document.querySelector("#edit-profile");
      editProfile.removeEventListener("click", verifyProfile);
      editProfile.addEventListener("click", verifyProfile);
    });

    function verifyProfile(evt) {
      evt.preventDefault();
      $("#verify").slideToggle();
    }

    // Add event listener to home buttom to return to main page
    $homeButton.on("click", async function () {
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      $favArticles.hide();
      $ownStories.hide();
      $submitForm.hide();
      $loginForm.hide();
      $(".trash").hide();
      $("#article-form").hide();
      $(".edit").hide();
      $homeButton.hide();
      $mainNavLinks.show();
      $allStoriesList.show();
      $("#edit-story").appendTo("body");
      $("#edit-story").hide();
      currentUser = await User.getLoggedInUser(token, username);
      await generateStories();
    });

    // Add click event to heart in order to favorite an article
    $(".edit-articles-container").on("click", ".heart", async function (evt) {
      const story = evt.target.parentElement.parentElement;
      const username = localStorage.getItem("username");
      const token = localStorage.getItem("token");
      if (evt.target.classList.value === "far fa-heart") {
        evt.target.classList.value = "fas fa-heart";
        await User.addFavorite(
          currentUser.username,
          story.id,
          currentUser.loginToken
        );
        currentUser = await User.getLoggedInUser(token, username);
      } else if (evt.target.classList.value === "fas fa-heart") {
        evt.target.classList.value = "far fa-heart";
        await User.deleteFavorite(
          currentUser.username,
          story.id,
          currentUser.loginToken
        );
        currentUser = await User.getLoggedInUser(token, username);
        await generateStories();
      }
    });

    // Add click event to show list of favorites
    $("#nav-favorites").on("click", function (evt) {
      $mainNavLinks.hide();
      $homeButton.show();
      $favArticles.show();
      $allStoriesList.slideToggle();
      $favArticles.empty().toggleClass("hidden");
      if (currentUser.favorites.length === 0) {
        $favArticles.text("You haven't added any favorites yet");
      } else {
        currentUser.favorites.forEach(function (item) {
          $favArticles.prepend(generateStoryHTML(item, true));
        });
      }
    });

    // Add click event to show users own stories
    $("#nav-my-stories").on("click", showOwnStories);

    function showOwnStories() {
      $mainNavLinks.hide();
      $homeButton.show();
      $ownStories.show();
      $allStoriesList.hide("slide");
      $ownStories.empty();

      const favArr = [];
      for (let fav of currentUser.favorites) {
        favArr.push(fav.storyId);
      }
      if (currentUser.ownStories.length === 0) {
        $ownStories.text("You haven't added any stories yet");
      } else {
        currentUser.ownStories.forEach(function (item) {
          if (favArr.includes(item.storyId)) {
            $ownStories.prepend(generateStoryHTML(item, true));
          } else {
            $ownStories.prepend(generateStoryHTML(item));
          }
        });
      }
      setTimeout(function () {
        $(".trash").show();
        $(".edit").show();
      }, 350);
    }

    // Add event listener to delete story when viewing own stories
    $ownStories.on("click", ".trash", function (evt) {
      const storyId = evt.target.parentElement.parentElement.id;
      StoryList.deleteStory(currentUser.loginToken, storyId);
      evt.target.parentElement.parentElement.remove();
    });

    // Add click event to append update story form to DOM
    $ownStories.on("click", ".edit", function (evt) {
      const updateFormParent = evt.target.parentElement.parentElement;
      console.log([...evt.target.parentElement.parentElement.children]);
      console.log(updateFormParent);
      if (updateFormParent.children.length === 7) {
        $("#edit-story").appendTo(updateFormParent);
        $("#edit-story").slideToggle();
      } else {
        $("#edit-story").slideToggle();
      }
    });

    // Add event listener to update own story
    $ownStories.on("submit", "#edit-story", updateOwnStory);

    async function updateOwnStory(evt) {
      evt.preventDefault();
      const $newAuthor = $("#update-author").val();
      const $newTitle = $("#update-title").val();
      const $newURL = $("#update-url").val();
      const userToken = currentUser.loginToken;
      const storyId = evt.target.parentElement.id;

      $("#edit-story").slideToggle();
      $("#edit-story").appendTo("body");
      const updatedInfo = await StoryList.updateStory(userToken, storyId, [
        $newAuthor,
        $newTitle,
        $newURL,
      ]);
      $("#edit-story").trigger("reset");
      currentUser = await User.getLoggedInUser(userToken, currentUser.username);
      showOwnStories();
    }
  }

  /**
   * A rendering function to run to reset the forms and hide the login info
   */

  function loginAndSubmitForm() {
    // hide the forms for logging in and signing up
    $loginForm.hide();
    $createAccountForm.hide();

    // reset those forms
    $loginForm.trigger("reset");
    $createAccountForm.trigger("reset");

    // show the stories
    $allStoriesList.show();

    // update the navigation bar
    showNavForLoggedInUser();
  }

  /**
   * A rendering function to call the StoryList.getStories static method,
   *  which will generate a storyListInstance. Then render it.
   */

  async function generateStories() {
    // get an instance of StoryList
    const storyListInstance = await StoryList.getStories();
    // update our global variable
    storyList = storyListInstance;
    // empty out that part of the page
    $allStoriesList.empty();

    if (currentUser) {
      const favArr = [];
      for (let fav of currentUser.favorites) {
        favArr.push(fav.storyId);
      }
      // loop through all of our stories and generate HTML for them
      for (let story of storyList.stories) {
        let result;
        if (favArr.includes(story.storyId) !== false) {
          result = generateStoryHTML(story, true);
          $allStoriesList.append(result);
        } else {
          result = generateStoryHTML(story, false);
          $allStoriesList.append(result);
        }
      }
    } else {
      for (let story of storyList.stories) {
        let result = generateStoryHTML(story);
        $allStoriesList.append(result);
      }
    }
  }

  /**
   * A function to render HTML for an individual Story instance
   */

  function generateStoryHTML(story, fav = false) {
    let hostName = getHostName(story.url);
    // render story markup
    const storyMarkup = $(`
       <li id="${story.storyId}">
         <span class="edit hidden">
           <i class="fas fa-edit"></i>
         </span>
         <span class="trash hidden">
           <i class="fa fa-trash"></i>
         </span> 
         <span class="heart ${currentUser === null ? "hidden" : ""}">
           <i class="fa${fav === true ? "s" : "r"} fa-heart"></i>
         </span>
        <a class="article-link" href="${story.url}" target="a_blank">
          <strong>${story.title}</strong>
        </a>
        <small class="article-author">by ${story.author}</small>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        <small class="article-username">posted by ${story.username}</small>
      </li>
    `);

    return storyMarkup;
  }

  /* hide all elements in elementsArr */

  function hideElements() {
    const elementsArr = [
      $submitForm,
      $allStoriesList,
      $filteredArticles,
      $ownStories,
      $loginForm,
      $createAccountForm,
      $mainNavLinks,
      $navLogOut,
    ];
    elementsArr.forEach(($elem) => $elem.hide());
  }

  function showNavForLoggedInUser() {
    $navLogin.hide();
    $navLogOut.show();
    $mainNavLinks.show();
    $("#user").empty().append(currentUser.username);
  }

  /* simple function to pull the hostname from a URL */

  function getHostName(url) {
    let hostName;
    if (url.indexOf("://") > -1) {
      hostName = url.split("/")[2];
    } else {
      hostName = url.split("/")[0];
    }
    if (hostName.slice(0, 4) === "www.") {
      hostName = hostName.slice(4);
    }
    return hostName;
  }

  /* sync current user information to localStorage */

  function syncCurrentUserToLocalStorage() {
    if (currentUser) {
      localStorage.setItem("token", currentUser.loginToken);
      localStorage.setItem("username", currentUser.username);
    }
  }
});
