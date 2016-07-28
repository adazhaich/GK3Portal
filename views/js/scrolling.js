<!DOCTYPE html>
<html lang="en" class=" is-copy-enabled">
  <head prefix="og: http://ogp.me/ns# fb: http://ogp.me/ns/fb# object: http://ogp.me/ns/object# article: http://ogp.me/ns/article# profile: http://ogp.me/ns/profile#">
    <meta charset='utf-8'>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Language" content="en">
    <meta name="viewport" content="width=1020">
    
    
    <title>Plugins/scrolling.js at master · DataTables/Plugins</title>
    <link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="GitHub">
    <link rel="fluid-icon" href="https://github.com/fluidicon.png" title="GitHub">
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114.png">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-144.png">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144.png">
    <meta property="fb:app_id" content="1401488693436528">

      <meta content="@github" name="twitter:site" /><meta content="summary" name="twitter:card" /><meta content="DataTables/Plugins" name="twitter:title" /><meta content="Plugins - Plug-ins for DataTables" name="twitter:description" /><meta content="https://avatars0.githubusercontent.com/u/278219?v=3&amp;s=400" name="twitter:image:src" />
      <meta content="GitHub" property="og:site_name" /><meta content="object" property="og:type" /><meta content="https://avatars0.githubusercontent.com/u/278219?v=3&amp;s=400" property="og:image" /><meta content="DataTables/Plugins" property="og:title" /><meta content="https://github.com/DataTables/Plugins" property="og:url" /><meta content="Plugins - Plug-ins for DataTables" property="og:description" />
      <meta name="browser-stats-url" content="https://api.github.com/_private/browser/stats">
    <meta name="browser-errors-url" content="https://api.github.com/_private/browser/errors">
    <link rel="assets" href="https://assets-cdn.github.com/">
    <link rel="web-socket" href="wss://live.github.com/_sockets/MTYxMzc2MjQ6YTdiZDBkYTQ3MTMyNjdkMWNhMTM4YWI3MzM0YTkwNjU6MjMzN2U0N2I5M2YxMjQ1YWNmNTdiMmI5MTJhYWFjN2UyMTg5ZmZmM2VkMGMzOTIzYWQ5MGM0YmVkMzc4M2VmOQ==--b9723a281a981c716959bb27580e90f6af0dbc9e">
    <meta name="pjax-timeout" content="1000">
    <link rel="sudo-modal" href="/sessions/sudo_modal">

    <meta name="msapplication-TileImage" content="/windows-tile.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="selected-link" value="repo_source" data-pjax-transient>

    <meta name="google-site-verification" content="KT5gs8h0wvaagLKAVWq8bbeNwnZZK1r1XQysX3xurLU">
    <meta name="google-analytics" content="UA-3769691-2">

<meta content="collector.githubapp.com" name="octolytics-host" /><meta content="github" name="octolytics-app-id" /><meta content="6C2C9B9A:2F45:16E6713F:5671B612" name="octolytics-dimension-request_id" /><meta content="16137624" name="octolytics-actor-id" /><meta content="hz-mbs" name="octolytics-actor-login" /><meta content="c99a78eebe1aae6bbc45773be68056343c015b1e5c4377546dc9d74e41654237" name="octolytics-actor-hash" />
<meta content="/&lt;user-name&gt;/&lt;repo-name&gt;/blob/show" data-pjax-transient="true" name="analytics-location" />
<meta content="Rails, view, blob#show" data-pjax-transient="true" name="analytics-event" />


  <meta class="js-ga-set" name="dimension1" content="Logged In">



        <meta name="hostname" content="github.com">
    <meta name="user-login" content="hz-mbs">

        <meta name="expected-hostname" content="github.com">

      <link rel="mask-icon" href="https://assets-cdn.github.com/pinned-octocat.svg" color="#4078c0">
      <link rel="icon" type="image/x-icon" href="https://assets-cdn.github.com/favicon.ico">

    <meta content="80d350abb0c43c29eea799d7e0430fbb3e356081" name="form-nonce" />

    <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/github-502ab50993b65c1ac75efa286ffd5304245f6c9bb4171ac014fbcf92f6f688de.css" integrity="sha256-UCq1CZO2XBrHXvoob/1TBCRfbJu0FxrAFPvPkvb2iN4=" media="all" rel="stylesheet" />
    <link crossorigin="anonymous" href="https://assets-cdn.github.com/assets/github2-3489439d0b3b87d58adb9528029812d8b7ab444fc86a839d940dc1228f09c653.css" integrity="sha256-NIlDnQs7h9WK25UoApgS2LerRE/IaoOdlA3BIo8JxlM=" media="all" rel="stylesheet" />
    
    


    <meta http-equiv="x-pjax-version" content="c028dd96bd91b28c723f328a55030a4b">

      
  <meta name="description" content="Plugins - Plug-ins for DataTables">
  <meta name="go-import" content="github.com/DataTables/Plugins git https://github.com/DataTables/Plugins.git">

  <meta content="278219" name="octolytics-dimension-user_id" /><meta content="DataTables" name="octolytics-dimension-user_login" /><meta content="4505588" name="octolytics-dimension-repository_id" /><meta content="DataTables/Plugins" name="octolytics-dimension-repository_nwo" /><meta content="true" name="octolytics-dimension-repository_public" /><meta content="false" name="octolytics-dimension-repository_is_fork" /><meta content="4505588" name="octolytics-dimension-repository_network_root_id" /><meta content="DataTables/Plugins" name="octolytics-dimension-repository_network_root_nwo" />
  <link href="https://github.com/DataTables/Plugins/commits/master.atom" rel="alternate" title="Recent Commits to Plugins:master" type="application/atom+xml">

  </head>


  <body class="logged_in   env-production windows vis-public page-blob">
    <a href="#start-of-content" tabindex="1" class="accessibility-aid js-skip-to-content">Skip to content</a>

    
    
    



      <div class="header header-logged-in true" role="banner">
  <div class="container clearfix">

    <a class="header-logo-invertocat" href="https://github.com/" data-hotkey="g d" aria-label="Homepage" data-ga-click="Header, go to dashboard, icon:logo">
  <span class="mega-octicon octicon-mark-github"></span>
</a>


      <div class="site-search repo-scope js-site-search" role="search">
          <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/DataTables/Plugins/search" class="js-site-search-form" data-global-search-url="/search" data-repo-search-url="/DataTables/Plugins/search" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
  <label class="js-chromeless-input-container form-control">
    <div class="scope-badge">This repository</div>
    <input type="text"
      class="js-site-search-focus js-site-search-field is-clearable chromeless-input"
      data-hotkey="s"
      name="q"
      placeholder="Search"
      aria-label="Search this repository"
      data-global-scope-placeholder="Search GitHub"
      data-repo-scope-placeholder="Search"
      tabindex="1"
      autocapitalize="off">
  </label>
</form>
      </div>

      <ul class="header-nav left" role="navigation">
        <li class="header-nav-item">
          <a href="/pulls" class="js-selected-navigation-item header-nav-link" data-ga-click="Header, click, Nav menu - item:pulls context:user" data-hotkey="g p" data-selected-links="/pulls /pulls/assigned /pulls/mentioned /pulls">
            Pull requests
</a>        </li>
        <li class="header-nav-item">
          <a href="/issues" class="js-selected-navigation-item header-nav-link" data-ga-click="Header, click, Nav menu - item:issues context:user" data-hotkey="g i" data-selected-links="/issues /issues/assigned /issues/mentioned /issues">
            Issues
</a>        </li>
          <li class="header-nav-item">
            <a class="header-nav-link" href="https://gist.github.com/" data-ga-click="Header, go to gist, text:gist">Gist</a>
          </li>
      </ul>

    
<ul class="header-nav user-nav right" id="user-links">
  <li class="header-nav-item">
      <span class="js-socket-channel js-updatable-content"
        data-channel="notification-changed:hz-mbs"
        data-url="/notifications/header">
      <a href="/notifications" aria-label="You have unread notifications" class="header-nav-link notification-indicator tooltipped tooltipped-s" data-ga-click="Header, go to notifications, icon:unread" data-hotkey="g n">
          <span class="mail-status unread"></span>
          <span class="octicon octicon-bell"></span>
</a>  </span>

  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link tooltipped tooltipped-s js-menu-target" href="/new"
       aria-label="Create new…"
       data-ga-click="Header, create new, icon:add">
      <span class="octicon octicon-plus left"></span>
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      <ul class="dropdown-menu dropdown-menu-sw">
        
<a class="dropdown-item" href="/new" data-ga-click="Header, create new repository">
  New repository
</a>


  <a class="dropdown-item" href="/organizations/new" data-ga-click="Header, create new organization">
    New organization
  </a>



  <div class="dropdown-divider"></div>
  <div class="dropdown-header">
    <span title="DataTables/Plugins">This repository</span>
  </div>
    <a class="dropdown-item" href="/DataTables/Plugins/issues/new" data-ga-click="Header, create new issue">
      New issue
    </a>

      </ul>
    </div>
  </li>

  <li class="header-nav-item dropdown js-menu-container">
    <a class="header-nav-link name tooltipped tooltipped-sw js-menu-target" href="/hz-mbs"
       aria-label="View profile and more"
       data-ga-click="Header, show menu, icon:avatar">
      <img alt="@hz-mbs" class="avatar" height="20" src="https://avatars1.githubusercontent.com/u/16137624?v=3&amp;s=40" width="20" />
      <span class="dropdown-caret"></span>
    </a>

    <div class="dropdown-menu-content js-menu-content">
      <div class="dropdown-menu  dropdown-menu-sw">
        <div class=" dropdown-header header-nav-current-user css-truncate">
            Signed in as <strong class="css-truncate-target">hz-mbs</strong>

        </div>


        <div class="dropdown-divider"></div>

          <a class="dropdown-item" href="/hz-mbs" data-ga-click="Header, go to profile, text:your profile">
            Your profile
          </a>
        <a class="dropdown-item" href="/stars" data-ga-click="Header, go to starred repos, text:your stars">
          Your stars
        </a>
        <a class="dropdown-item" href="/explore" data-ga-click="Header, go to explore, text:explore">
          Explore
        </a>
          <a class="dropdown-item" href="/integrations" data-ga-click="Header, go to integrations, text:integrations">
            Integrations
          </a>
        <a class="dropdown-item" href="https://help.github.com" data-ga-click="Header, go to help, text:help">
          Help
        </a>

          <div class="dropdown-divider"></div>

          <a class="dropdown-item" href="/settings/profile" data-ga-click="Header, go to settings, icon:settings">
            Settings
          </a>

          <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/logout" class="logout-form" data-form-nonce="80d350abb0c43c29eea799d7e0430fbb3e356081" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="lflNlM9P8K5yXCLDFDO1ISe/da8GrBWqLm5kOE77hvqjEBUwhnJy5YJ/hoPrCmHzmKc4AMrs1NczKvUbRb2L4Q==" /></div>
            <button class="dropdown-item dropdown-signout" data-ga-click="Header, sign out, icon:logout">
              Sign out
            </button>
</form>
      </div>
    </div>
  </li>
</ul>


    
  </div>
</div>

      

      


    <div id="start-of-content" class="accessibility-aid"></div>

      <div id="js-flash-container">
</div>


    <div role="main" class="main-content">
        <div itemscope itemtype="http://schema.org/WebPage">
    <div id="js-repo-pjax-container" class="context-loader-container js-repo-nav-next" data-pjax-container>
      
<div class="pagehead repohead instapaper_ignore readability-menu experiment-repo-nav">
  <div class="container repohead-details-container">

    

<ul class="pagehead-actions">

  <li>
        <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/notifications/subscribe" class="js-social-container" data-autosubmit="true" data-form-nonce="80d350abb0c43c29eea799d7e0430fbb3e356081" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="nvdi0XrUxZRqmlO57Opn2nPSkcqO2M+A385A5oo00f8iBuwGAIMcKEgM5H1lbLoxIyANZR1SJOwmMZAtO+KsNA==" /></div>      <input id="repository_id" name="repository_id" type="hidden" value="4505588" />

        <div class="select-menu js-menu-container js-select-menu">
          <a href="/DataTables/Plugins/subscription"
            class="btn btn-sm btn-with-count select-menu-button js-menu-target" role="button" tabindex="0" aria-haspopup="true"
            data-ga-click="Repository, click Watch settings, action:blob#show">
            <span class="js-select-button">
              <span class="octicon octicon-eye"></span>
              Watch
            </span>
          </a>
          <a class="social-count js-social-count" href="/DataTables/Plugins/watchers">
            69
          </a>

        <div class="select-menu-modal-holder">
          <div class="select-menu-modal subscription-menu-modal js-menu-content" aria-hidden="true">
            <div class="select-menu-header">
              <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
              <span class="select-menu-title">Notifications</span>
            </div>

              <div class="select-menu-list js-navigation-container" role="menu">

                <div class="select-menu-item js-navigation-item selected" role="menuitem" tabindex="0">
                  <span class="select-menu-item-icon octicon octicon-check"></span>
                  <div class="select-menu-item-text">
                    <input checked="checked" id="do_included" name="do" type="radio" value="included" />
                    <span class="select-menu-item-heading">Not watching</span>
                    <span class="description">Be notified when participating or @mentioned.</span>
                    <span class="js-select-button-text hidden-select-button-text">
                      <span class="octicon octicon-eye"></span>
                      Watch
                    </span>
                  </div>
                </div>

                <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
                  <span class="select-menu-item-icon octicon octicon octicon-check"></span>
                  <div class="select-menu-item-text">
                    <input id="do_subscribed" name="do" type="radio" value="subscribed" />
                    <span class="select-menu-item-heading">Watching</span>
                    <span class="description">Be notified of all conversations.</span>
                    <span class="js-select-button-text hidden-select-button-text">
                      <span class="octicon octicon-eye"></span>
                      Unwatch
                    </span>
                  </div>
                </div>

                <div class="select-menu-item js-navigation-item " role="menuitem" tabindex="0">
                  <span class="select-menu-item-icon octicon octicon-check"></span>
                  <div class="select-menu-item-text">
                    <input id="do_ignore" name="do" type="radio" value="ignore" />
                    <span class="select-menu-item-heading">Ignoring</span>
                    <span class="description">Never be notified.</span>
                    <span class="js-select-button-text hidden-select-button-text">
                      <span class="octicon octicon-mute"></span>
                      Stop ignoring
                    </span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
</form>
  </li>

  <li>
    
  <div class="js-toggler-container js-social-container starring-container ">

    <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/DataTables/Plugins/unstar" class="js-toggler-form starred js-unstar-button" data-form-nonce="80d350abb0c43c29eea799d7e0430fbb3e356081" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="Z1bvzaGRn6CgfBcIE37QBxQyg77MBRFF3JxjTPc+7VtQ/31lwvdLdxcabgErCsQSDYY+mRoH88Y2hgQkn39h0g==" /></div>
      <button
        class="btn btn-sm btn-with-count js-toggler-target"
        aria-label="Unstar this repository" title="Unstar DataTables/Plugins"
        data-ga-click="Repository, click unstar button, action:blob#show; text:Unstar">
        <span class="octicon octicon-star"></span>
        Unstar
      </button>
        <a class="social-count js-social-count" href="/DataTables/Plugins/stargazers">
          548
        </a>
</form>
    <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/DataTables/Plugins/star" class="js-toggler-form unstarred js-star-button" data-form-nonce="80d350abb0c43c29eea799d7e0430fbb3e356081" data-remote="true" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="ZRFDjDzo2Ojbdr3jBMnx0KB+NHsOEncm9/gDpzDAyD2tB6Y5ie0RGUyZPdlCLYfJdRWpYifDUDbyozgLdL3DBA==" /></div>
      <button
        class="btn btn-sm btn-with-count js-toggler-target"
        aria-label="Star this repository" title="Star DataTables/Plugins"
        data-ga-click="Repository, click star button, action:blob#show; text:Star">
        <span class="octicon octicon-star"></span>
        Star
      </button>
        <a class="social-count js-social-count" href="/DataTables/Plugins/stargazers">
          548
        </a>
</form>  </div>

  </li>

  <li>
          <a href="#fork-destination-box" class="btn btn-sm btn-with-count"
              title="Fork your own copy of DataTables/Plugins to your account"
              aria-label="Fork your own copy of DataTables/Plugins to your account"
              rel="facebox"
              data-ga-click="Repository, show fork modal, action:blob#show; text:Fork">
            <span class="octicon octicon-repo-forked"></span>
            Fork
          </a>

          <div id="fork-destination-box" style="display: none;">
            <h2 class="facebox-header" data-facebox-id="facebox-header">Where should we fork this repository?</h2>
            <include-fragment src=""
                class="js-fork-select-fragment fork-select-fragment"
                data-url="/DataTables/Plugins/fork?fragment=1">
              <img alt="Loading" height="64" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-128.gif" width="64" />
            </include-fragment>
          </div>

    <a href="/DataTables/Plugins/network" class="social-count">
      1,081
    </a>
  </li>
</ul>

    <h1 itemscope itemtype="http://data-vocabulary.org/Breadcrumb" class="entry-title public ">
  <span class="octicon octicon-repo"></span>
  <span class="author"><a href="/DataTables" class="url fn" itemprop="url" rel="author"><span itemprop="title">DataTables</span></a></span><!--
--><span class="path-divider">/</span><!--
--><strong><a href="/DataTables/Plugins" data-pjax="#js-repo-pjax-container">Plugins</a></strong>

  <span class="page-context-loader">
    <img alt="" height="16" src="https://assets-cdn.github.com/images/spinners/octocat-spinner-32.gif" width="16" />
  </span>

</h1>

  </div>
  <div class="container">
    
<nav class="reponav js-repo-nav js-sidenav-container-pjax js-octicon-loaders"
     role="navigation"
     data-pjax="#js-repo-pjax-container">

  <a href="/DataTables/Plugins" aria-label="Code" aria-selected="true" class="js-selected-navigation-item selected reponav-item" data-hotkey="g c" data-selected-links="repo_source repo_downloads repo_commits repo_releases repo_tags repo_branches /DataTables/Plugins">
    <span class="octicon octicon-code"></span>
    Code
</a>
    <a href="/DataTables/Plugins/issues" class="js-selected-navigation-item reponav-item" data-hotkey="g i" data-selected-links="repo_issues repo_labels repo_milestones /DataTables/Plugins/issues">
      <span class="octicon octicon-issue-opened"></span>
      Issues
      <span class="counter">33</span>
</a>
  <a href="/DataTables/Plugins/pulls" class="js-selected-navigation-item reponav-item" data-hotkey="g p" data-selected-links="repo_pulls /DataTables/Plugins/pulls">
    <span class="octicon octicon-git-pull-request"></span>
    Pull requests
    <span class="counter">23</span>
</a>
    <a href="/DataTables/Plugins/wiki" class="js-selected-navigation-item reponav-item" data-hotkey="g w" data-selected-links="repo_wiki /DataTables/Plugins/wiki">
      <span class="octicon octicon-book"></span>
      Wiki
</a>
  <a href="/DataTables/Plugins/pulse" class="js-selected-navigation-item reponav-item" data-selected-links="pulse /DataTables/Plugins/pulse">
    <span class="octicon octicon-pulse"></span>
    Pulse
</a>
  <a href="/DataTables/Plugins/graphs" class="js-selected-navigation-item reponav-item" data-selected-links="repo_graphs repo_contributors /DataTables/Plugins/graphs">
    <span class="octicon octicon-graph"></span>
    Graphs
</a>

</nav>

  </div>
</div>

<div class="container new-discussion-timeline experiment-repo-nav">
  <div class="repository-content">

    

<a href="/DataTables/Plugins/blob/2b38ee66064bae6c61be41c5da2a1213decac433/pagination/scrolling.js" class="hidden js-permalink-shortcut" data-hotkey="y">Permalink</a>

<!-- blob contrib key: blob_contributors:v21:5cebee85db81c463b60faf86d8245fac -->

<div class="file-navigation js-zeroclipboard-container">
  
<div class="select-menu js-menu-container js-select-menu left">
  <button class="btn btn-sm select-menu-button js-menu-target css-truncate" data-hotkey="w"
    title="master"
    type="button" aria-label="Switch branches or tags" tabindex="0" aria-haspopup="true">
    <i>Branch:</i>
    <span class="js-select-button css-truncate-target">master</span>
  </button>

  <div class="select-menu-modal-holder js-menu-content js-navigation-container" data-pjax aria-hidden="true">

    <div class="select-menu-modal">
      <div class="select-menu-header">
        <span class="octicon octicon-x js-menu-close" role="button" aria-label="Close"></span>
        <span class="select-menu-title">Switch branches/tags</span>
      </div>

      <div class="select-menu-filters">
        <div class="select-menu-text-filter">
          <input type="text" aria-label="Filter branches/tags" id="context-commitish-filter-field" class="js-filterable-field js-navigation-enable" placeholder="Filter branches/tags">
        </div>
        <div class="select-menu-tabs">
          <ul>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="branches" data-filter-placeholder="Filter branches/tags" class="js-select-menu-tab" role="tab">Branches</a>
            </li>
            <li class="select-menu-tab">
              <a href="#" data-tab-filter="tags" data-filter-placeholder="Find a tag…" class="js-select-menu-tab" role="tab">Tags</a>
            </li>
          </ul>
        </div>
      </div>

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="branches" role="menu">

        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <a class="select-menu-item js-navigation-item js-navigation-open "
               href="/DataTables/Plugins/blob/gh-pages/pagination/scrolling.js"
               data-name="gh-pages"
               data-skip-pjax="true"
               rel="nofollow">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <span class="select-menu-item-text css-truncate-target" title="gh-pages">
                gh-pages
              </span>
            </a>
            <a class="select-menu-item js-navigation-item js-navigation-open selected"
               href="/DataTables/Plugins/blob/master/pagination/scrolling.js"
               data-name="master"
               data-skip-pjax="true"
               rel="nofollow">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <span class="select-menu-item-text css-truncate-target" title="master">
                master
              </span>
            </a>
        </div>

          <div class="select-menu-no-results">Nothing to show</div>
      </div>

      <div class="select-menu-list select-menu-tab-bucket js-select-menu-tab-bucket" data-tab-filter="tags">
        <div data-filterable-for="context-commitish-filter-field" data-filterable-type="substring">


            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/DataTables/Plugins/tree/1.10.10/pagination/scrolling.js"
                 data-name="1.10.10"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.10.10">1.10.10</a>
            </div>
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/DataTables/Plugins/tree/1.10.9/pagination/scrolling.js"
                 data-name="1.10.9"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.10.9">1.10.9</a>
            </div>
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/DataTables/Plugins/tree/1.10.8/pagination/scrolling.js"
                 data-name="1.10.8"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.10.8">1.10.8</a>
            </div>
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/DataTables/Plugins/tree/1.10.7/pagination/scrolling.js"
                 data-name="1.10.7"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.10.7">1.10.7</a>
            </div>
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/DataTables/Plugins/tree/1.10.6/pagination/scrolling.js"
                 data-name="1.10.6"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.10.6">1.10.6</a>
            </div>
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/DataTables/Plugins/tree/1.10.5/pagination/scrolling.js"
                 data-name="1.10.5"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.10.5">1.10.5</a>
            </div>
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/DataTables/Plugins/tree/1.0.1/pagination/scrolling.js"
                 data-name="1.0.1"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.0.1">1.0.1</a>
            </div>
            <div class="select-menu-item js-navigation-item ">
              <span class="select-menu-item-icon octicon octicon-check"></span>
              <a href="/DataTables/Plugins/tree/1.0.0/pagination/scrolling.js"
                 data-name="1.0.0"
                 data-skip-pjax="true"
                 rel="nofollow"
                 class="js-navigation-open select-menu-item-text css-truncate-target"
                 title="1.0.0">1.0.0</a>
            </div>
        </div>

        <div class="select-menu-no-results">Nothing to show</div>
      </div>

    </div>
  </div>
</div>

  <div class="btn-group right">
    <a href="/DataTables/Plugins/find/master"
          class="js-show-file-finder btn btn-sm"
          data-pjax
          data-hotkey="t">
      Find file
    </a>
    <button aria-label="Copy file path to clipboard" class="js-zeroclipboard btn btn-sm zeroclipboard-button tooltipped tooltipped-s" data-copied-hint="Copied!" type="button">Copy path</button>
  </div>
  <div class="breadcrumb js-zeroclipboard-target">
    <span class="repo-root js-repo-root"><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/DataTables/Plugins" class="" data-branch="master" data-pjax="true" itemscope="url"><span itemprop="title">Plugins</span></a></span></span><span class="separator">/</span><span itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb"><a href="/DataTables/Plugins/tree/master/pagination" class="" data-branch="master" data-pjax="true" itemscope="url"><span itemprop="title">pagination</span></a></span><span class="separator">/</span><strong class="final-path">scrolling.js</strong>
  </div>
</div>


  <div class="commit-tease">
      <span class="right">
        <a class="commit-tease-sha" href="/DataTables/Plugins/commit/4f29d7fda6e04574c8a47e7628a039b074c8ef66" data-pjax>
          4f29d7f
        </a>
        <time datetime="2014-01-08T17:06:10Z" is="relative-time">Jan 8, 2014</time>
      </span>
      <div>
        <img alt="@DataTables" class="avatar" height="20" src="https://avatars1.githubusercontent.com/u/278219?v=3&amp;s=40" width="20" />
        <a href="/DataTables" class="user-mention" rel="author">DataTables</a>
          <a href="/DataTables/Plugins/commit/4f29d7fda6e04574c8a47e7628a039b074c8ef66" class="message" data-pjax="true" title="Major update to doc comment formatting for new DataTables web-site
Also correct a load of JS errors such as leaking variables and use
consistent formatting.">Major update to doc comment formatting for new DataTables web-site</a>
      </div>

    <div class="commit-tease-contributors">
      <a class="muted-link contributors-toggle" href="#blob_contributors_box" rel="facebox">
        <strong>1</strong>
         contributor
      </a>
      
    </div>

    <div id="blob_contributors_box" style="display:none">
      <h2 class="facebox-header" data-facebox-id="facebox-header">Users who have contributed to this file</h2>
      <ul class="facebox-user-list" data-facebox-id="facebox-description">
          <li class="facebox-user-list-item">
            <img alt="@DataTables" height="24" src="https://avatars3.githubusercontent.com/u/278219?v=3&amp;s=48" width="24" />
            <a href="/DataTables">DataTables</a>
          </li>
      </ul>
    </div>
  </div>

<div class="file">
  <div class="file-header">
  <div class="file-actions">

    <div class="btn-group">
      <a href="/DataTables/Plugins/raw/master/pagination/scrolling.js" class="btn btn-sm " id="raw-url">Raw</a>
        <a href="/DataTables/Plugins/blame/master/pagination/scrolling.js" class="btn btn-sm js-update-url-with-hash">Blame</a>
      <a href="/DataTables/Plugins/commits/master/pagination/scrolling.js" class="btn btn-sm " rel="nofollow">History</a>
    </div>

        <a class="octicon-btn tooltipped tooltipped-nw"
           href="github-windows://openRepo/https://github.com/DataTables/Plugins?branch=master&amp;filepath=pagination%2Fscrolling.js"
           aria-label="Open this file in GitHub Desktop"
           data-ga-click="Repository, open with desktop, type:windows">
            <span class="octicon octicon-device-desktop"></span>
        </a>

        <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/DataTables/Plugins/edit/master/pagination/scrolling.js" class="inline-form js-update-url-with-hash" data-form-nonce="80d350abb0c43c29eea799d7e0430fbb3e356081" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="GzqQ3tAT75Ugey97jvRbfj9AQxo6cXAyA7kXeqKVkrMfzj29s7pLm4UA+w/hmta5aWmnKNWqdb2mNgAxeSPr/A==" /></div>
          <button class="octicon-btn tooltipped tooltipped-nw" type="submit"
            aria-label="Fork this project and edit the file" data-hotkey="e" data-disable-with>
            <span class="octicon octicon-pencil"></span>
          </button>
</form>        <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="/DataTables/Plugins/delete/master/pagination/scrolling.js" class="inline-form" data-form-nonce="80d350abb0c43c29eea799d7e0430fbb3e356081" method="post"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /><input name="authenticity_token" type="hidden" value="8T4HcTimddeP77ZT9l3+P19dAgV+fH2HFOk2+PGpRQ/g73dKXhIXv8xYZPMlMTwQFxWaRbfpbFfc0m8dtpAITQ==" /></div>
          <button class="octicon-btn octicon-btn-danger tooltipped tooltipped-nw" type="submit"
            aria-label="Fork this project and delete the file" data-disable-with>
            <span class="octicon octicon-trashcan"></span>
          </button>
</form>  </div>

  <div class="file-info">
      131 lines (114 sloc)
      <span class="file-info-divider"></span>
    4.24 KB
  </div>
</div>

  

  <div class="blob-wrapper data type-javascript">
      <table class="highlight tab-size js-file-line-container" data-tab-size="8">
      <tr>
        <td id="L1" class="blob-num js-line-number" data-line-number="1"></td>
        <td id="LC1" class="blob-code blob-code-inner js-file-line"><span class="pl-c">/**</span></td>
      </tr>
      <tr>
        <td id="L2" class="blob-num js-line-number" data-line-number="2"></td>
        <td id="LC2" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> * This modification of DataTables&#39; standard two button pagination controls</span></td>
      </tr>
      <tr>
        <td id="L3" class="blob-num js-line-number" data-line-number="3"></td>
        <td id="LC3" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> * adds a little animation effect to the paging action by redrawing the table</span></td>
      </tr>
      <tr>
        <td id="L4" class="blob-num js-line-number" data-line-number="4"></td>
        <td id="LC4" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> * multiple times for each event, each draw progressing by one row until the</span></td>
      </tr>
      <tr>
        <td id="L5" class="blob-num js-line-number" data-line-number="5"></td>
        <td id="LC5" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> * required point in the table is reached.</span></td>
      </tr>
      <tr>
        <td id="L6" class="blob-num js-line-number" data-line-number="6"></td>
        <td id="LC6" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *</span></td>
      </tr>
      <tr>
        <td id="L7" class="blob-num js-line-number" data-line-number="7"></td>
        <td id="LC7" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *  <span class="pl-k">@name</span> Scrolling navigation</span></td>
      </tr>
      <tr>
        <td id="L8" class="blob-num js-line-number" data-line-number="8"></td>
        <td id="LC8" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *  <span class="pl-k">@summary</span> Show page changes as a redraw of the table, scrolling records.</span></td>
      </tr>
      <tr>
        <td id="L9" class="blob-num js-line-number" data-line-number="9"></td>
        <td id="LC9" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *  <span class="pl-k">@author</span> [Allan Jardine](http://sprymedia.co.uk)</span></td>
      </tr>
      <tr>
        <td id="L10" class="blob-num js-line-number" data-line-number="10"></td>
        <td id="LC10" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *</span></td>
      </tr>
      <tr>
        <td id="L11" class="blob-num js-line-number" data-line-number="11"></td>
        <td id="LC11" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *  <span class="pl-k">@example</span></span></td>
      </tr>
      <tr>
        <td id="L12" class="blob-num js-line-number" data-line-number="12"></td>
        <td id="LC12" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *    $(document).ready(function() {</span></td>
      </tr>
      <tr>
        <td id="L13" class="blob-num js-line-number" data-line-number="13"></td>
        <td id="LC13" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *        $(&#39;#example&#39;).dataTable( {</span></td>
      </tr>
      <tr>
        <td id="L14" class="blob-num js-line-number" data-line-number="14"></td>
        <td id="LC14" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *            &quot;sPaginationType&quot;: &quot;scrolling&quot;</span></td>
      </tr>
      <tr>
        <td id="L15" class="blob-num js-line-number" data-line-number="15"></td>
        <td id="LC15" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *        } );</span></td>
      </tr>
      <tr>
        <td id="L16" class="blob-num js-line-number" data-line-number="16"></td>
        <td id="LC16" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> *    } );</span></td>
      </tr>
      <tr>
        <td id="L17" class="blob-num js-line-number" data-line-number="17"></td>
        <td id="LC17" class="blob-code blob-code-inner js-file-line"><span class="pl-c"> */</span></td>
      </tr>
      <tr>
        <td id="L18" class="blob-num js-line-number" data-line-number="18"></td>
        <td id="LC18" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L19" class="blob-num js-line-number" data-line-number="19"></td>
        <td id="LC19" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L20" class="blob-num js-line-number" data-line-number="20"></td>
        <td id="LC20" class="blob-code blob-code-inner js-file-line"><span class="pl-c">/* Time between each scrolling frame */</span></td>
      </tr>
      <tr>
        <td id="L21" class="blob-num js-line-number" data-line-number="21"></td>
        <td id="LC21" class="blob-code blob-code-inner js-file-line"><span class="pl-smi">$</span>.<span class="pl-smi">fn</span>.<span class="pl-smi">dataTableExt</span>.<span class="pl-smi">oPagination</span>.<span class="pl-smi">iTweenTime</span> <span class="pl-k">=</span> <span class="pl-c1">100</span>;</td>
      </tr>
      <tr>
        <td id="L22" class="blob-num js-line-number" data-line-number="22"></td>
        <td id="LC22" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L23" class="blob-num js-line-number" data-line-number="23"></td>
        <td id="LC23" class="blob-code blob-code-inner js-file-line"><span class="pl-smi">$</span>.<span class="pl-smi">fn</span>.<span class="pl-smi">dataTableExt</span>.<span class="pl-smi">oPagination</span>.<span class="pl-c1">scrolling</span> <span class="pl-k">=</span> {</td>
      </tr>
      <tr>
        <td id="L24" class="blob-num js-line-number" data-line-number="24"></td>
        <td id="LC24" class="blob-code blob-code-inner js-file-line">	<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-en">fnInit</span><span class="pl-pds">&quot;</span></span><span class="pl-k">:</span> <span class="pl-k">function</span> ( <span class="pl-smi">oSettings</span>, <span class="pl-smi">nPaging</span>, <span class="pl-smi">fnCallbackDraw</span> )</td>
      </tr>
      <tr>
        <td id="L25" class="blob-num js-line-number" data-line-number="25"></td>
        <td id="LC25" class="blob-code blob-code-inner js-file-line">	{</td>
      </tr>
      <tr>
        <td id="L26" class="blob-num js-line-number" data-line-number="26"></td>
        <td id="LC26" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">var</span> oLang <span class="pl-k">=</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">oLanguage</span>.<span class="pl-smi">oPaginate</span>;</td>
      </tr>
      <tr>
        <td id="L27" class="blob-num js-line-number" data-line-number="27"></td>
        <td id="LC27" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">var</span> oClasses <span class="pl-k">=</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>;</td>
      </tr>
      <tr>
        <td id="L28" class="blob-num js-line-number" data-line-number="28"></td>
        <td id="LC28" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">var</span> <span class="pl-en">fnClickHandler</span> <span class="pl-k">=</span> <span class="pl-k">function</span> ( <span class="pl-smi">e</span> ) {</td>
      </tr>
      <tr>
        <td id="L29" class="blob-num js-line-number" data-line-number="29"></td>
        <td id="LC29" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">if</span> ( <span class="pl-smi">oSettings</span>.<span class="pl-smi">oApi</span>.<span class="pl-en">_fnPageChange</span>( oSettings, <span class="pl-smi">e</span>.<span class="pl-c1">data</span>.<span class="pl-c1">action</span> ) )</td>
      </tr>
      <tr>
        <td id="L30" class="blob-num js-line-number" data-line-number="30"></td>
        <td id="LC30" class="blob-code blob-code-inner js-file-line">			{</td>
      </tr>
      <tr>
        <td id="L31" class="blob-num js-line-number" data-line-number="31"></td>
        <td id="LC31" class="blob-code blob-code-inner js-file-line">				<span class="pl-en">fnCallbackDraw</span>( oSettings );</td>
      </tr>
      <tr>
        <td id="L32" class="blob-num js-line-number" data-line-number="32"></td>
        <td id="LC32" class="blob-code blob-code-inner js-file-line">			}</td>
      </tr>
      <tr>
        <td id="L33" class="blob-num js-line-number" data-line-number="33"></td>
        <td id="LC33" class="blob-code blob-code-inner js-file-line">		};</td>
      </tr>
      <tr>
        <td id="L34" class="blob-num js-line-number" data-line-number="34"></td>
        <td id="LC34" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L35" class="blob-num js-line-number" data-line-number="35"></td>
        <td id="LC35" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">var</span> sAppend <span class="pl-k">=</span> (<span class="pl-k">!</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">bJUI</span>) <span class="pl-k">?</span></td>
      </tr>
      <tr>
        <td id="L36" class="blob-num js-line-number" data-line-number="36"></td>
        <td id="LC36" class="blob-code blob-code-inner js-file-line">			<span class="pl-s"><span class="pl-pds">&#39;</span>&lt;a class=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPagePrevDisabled</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot; tabindex=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">iTabIndex</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot; role=&quot;button&quot;&gt;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oLang</span>.<span class="pl-smi">sPrevious</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&lt;/a&gt;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span></td>
      </tr>
      <tr>
        <td id="L37" class="blob-num js-line-number" data-line-number="37"></td>
        <td id="LC37" class="blob-code blob-code-inner js-file-line">			<span class="pl-s"><span class="pl-pds">&#39;</span>&lt;a class=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPageNextDisabled</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot; tabindex=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">iTabIndex</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot; role=&quot;button&quot;&gt;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oLang</span>.<span class="pl-smi">sNext</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&lt;/a&gt;<span class="pl-pds">&#39;</span></span></td>
      </tr>
      <tr>
        <td id="L38" class="blob-num js-line-number" data-line-number="38"></td>
        <td id="LC38" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">:</span></td>
      </tr>
      <tr>
        <td id="L39" class="blob-num js-line-number" data-line-number="39"></td>
        <td id="LC39" class="blob-code blob-code-inner js-file-line">			<span class="pl-s"><span class="pl-pds">&#39;</span>&lt;a class=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPagePrevDisabled</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot; tabindex=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">iTabIndex</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot; role=&quot;button&quot;&gt;&lt;span class=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPageJUIPrev</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot;&gt;&lt;/span&gt;&lt;/a&gt;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span></td>
      </tr>
      <tr>
        <td id="L40" class="blob-num js-line-number" data-line-number="40"></td>
        <td id="LC40" class="blob-code blob-code-inner js-file-line">			<span class="pl-s"><span class="pl-pds">&#39;</span>&lt;a class=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPageNextDisabled</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot; tabindex=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">iTabIndex</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot; role=&quot;button&quot;&gt;&lt;span class=&quot;<span class="pl-pds">&#39;</span></span><span class="pl-k">+</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPageJUINext</span><span class="pl-k">+</span><span class="pl-s"><span class="pl-pds">&#39;</span>&quot;&gt;&lt;/span&gt;&lt;/a&gt;<span class="pl-pds">&#39;</span></span>;</td>
      </tr>
      <tr>
        <td id="L41" class="blob-num js-line-number" data-line-number="41"></td>
        <td id="LC41" class="blob-code blob-code-inner js-file-line">		<span class="pl-en">$</span>(nPaging).<span class="pl-en">append</span>( sAppend );</td>
      </tr>
      <tr>
        <td id="L42" class="blob-num js-line-number" data-line-number="42"></td>
        <td id="LC42" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L43" class="blob-num js-line-number" data-line-number="43"></td>
        <td id="LC43" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">var</span> els <span class="pl-k">=</span> <span class="pl-en">$</span>(<span class="pl-s"><span class="pl-pds">&#39;</span>a<span class="pl-pds">&#39;</span></span>, nPaging);</td>
      </tr>
      <tr>
        <td id="L44" class="blob-num js-line-number" data-line-number="44"></td>
        <td id="LC44" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">var</span> nPrevious <span class="pl-k">=</span> els[<span class="pl-c1">0</span>],</td>
      </tr>
      <tr>
        <td id="L45" class="blob-num js-line-number" data-line-number="45"></td>
        <td id="LC45" class="blob-code blob-code-inner js-file-line">			nNext <span class="pl-k">=</span> els[<span class="pl-c1">1</span>];</td>
      </tr>
      <tr>
        <td id="L46" class="blob-num js-line-number" data-line-number="46"></td>
        <td id="LC46" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L47" class="blob-num js-line-number" data-line-number="47"></td>
        <td id="LC47" class="blob-code blob-code-inner js-file-line">		<span class="pl-smi">oSettings</span>.<span class="pl-smi">oApi</span>.<span class="pl-en">_fnBindAction</span>( nPrevious, {action<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">&quot;</span>previous<span class="pl-pds">&quot;</span></span>}, <span class="pl-k">function</span>() {</td>
      </tr>
      <tr>
        <td id="L48" class="blob-num js-line-number" data-line-number="48"></td>
        <td id="LC48" class="blob-code blob-code-inner js-file-line">			<span class="pl-c">/* Disallow paging event during a current paging event */</span></td>
      </tr>
      <tr>
        <td id="L49" class="blob-num js-line-number" data-line-number="49"></td>
        <td id="LC49" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">if</span> ( <span class="pl-k">typeof</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">!=</span> <span class="pl-s"><span class="pl-pds">&#39;</span>undefined<span class="pl-pds">&#39;</span></span> <span class="pl-k">&amp;&amp;</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">!=</span> <span class="pl-k">-</span><span class="pl-c1">1</span> )</td>
      </tr>
      <tr>
        <td id="L50" class="blob-num js-line-number" data-line-number="50"></td>
        <td id="LC50" class="blob-code blob-code-inner js-file-line">			{</td>
      </tr>
      <tr>
        <td id="L51" class="blob-num js-line-number" data-line-number="51"></td>
        <td id="LC51" class="blob-code blob-code-inner js-file-line">				<span class="pl-k">return</span>;</td>
      </tr>
      <tr>
        <td id="L52" class="blob-num js-line-number" data-line-number="52"></td>
        <td id="LC52" class="blob-code blob-code-inner js-file-line">			}</td>
      </tr>
      <tr>
        <td id="L53" class="blob-num js-line-number" data-line-number="53"></td>
        <td id="LC53" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L54" class="blob-num js-line-number" data-line-number="54"></td>
        <td id="LC54" class="blob-code blob-code-inner js-file-line">			<span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">=</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayStart</span>;</td>
      </tr>
      <tr>
        <td id="L55" class="blob-num js-line-number" data-line-number="55"></td>
        <td id="LC55" class="blob-code blob-code-inner js-file-line">			<span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingEnd</span> <span class="pl-k">=</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayStart</span> <span class="pl-k">-</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayLength</span>;</td>
      </tr>
      <tr>
        <td id="L56" class="blob-num js-line-number" data-line-number="56"></td>
        <td id="LC56" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L57" class="blob-num js-line-number" data-line-number="57"></td>
        <td id="LC57" class="blob-code blob-code-inner js-file-line">			<span class="pl-c">/* Correct for underrun */</span></td>
      </tr>
      <tr>
        <td id="L58" class="blob-num js-line-number" data-line-number="58"></td>
        <td id="LC58" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">if</span> ( <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingEnd</span> <span class="pl-k">&lt;</span> <span class="pl-c1">0</span> )</td>
      </tr>
      <tr>
        <td id="L59" class="blob-num js-line-number" data-line-number="59"></td>
        <td id="LC59" class="blob-code blob-code-inner js-file-line">			{</td>
      </tr>
      <tr>
        <td id="L60" class="blob-num js-line-number" data-line-number="60"></td>
        <td id="LC60" class="blob-code blob-code-inner js-file-line">				<span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingEnd</span> <span class="pl-k">=</span> <span class="pl-c1">0</span>;</td>
      </tr>
      <tr>
        <td id="L61" class="blob-num js-line-number" data-line-number="61"></td>
        <td id="LC61" class="blob-code blob-code-inner js-file-line">			}</td>
      </tr>
      <tr>
        <td id="L62" class="blob-num js-line-number" data-line-number="62"></td>
        <td id="LC62" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L63" class="blob-num js-line-number" data-line-number="63"></td>
        <td id="LC63" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">var</span> iTween <span class="pl-k">=</span> <span class="pl-smi">$</span>.<span class="pl-smi">fn</span>.<span class="pl-smi">dataTableExt</span>.<span class="pl-smi">oPagination</span>.<span class="pl-smi">iTweenTime</span>;</td>
      </tr>
      <tr>
        <td id="L64" class="blob-num js-line-number" data-line-number="64"></td>
        <td id="LC64" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">var</span> <span class="pl-en">innerLoop</span> <span class="pl-k">=</span> <span class="pl-k">function</span> () {</td>
      </tr>
      <tr>
        <td id="L65" class="blob-num js-line-number" data-line-number="65"></td>
        <td id="LC65" class="blob-code blob-code-inner js-file-line">				<span class="pl-k">if</span> ( <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">&gt;</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingEnd</span> ) {</td>
      </tr>
      <tr>
        <td id="L66" class="blob-num js-line-number" data-line-number="66"></td>
        <td id="LC66" class="blob-code blob-code-inner js-file-line">					<span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span><span class="pl-k">--</span>;</td>
      </tr>
      <tr>
        <td id="L67" class="blob-num js-line-number" data-line-number="67"></td>
        <td id="LC67" class="blob-code blob-code-inner js-file-line">					<span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayStart</span> <span class="pl-k">=</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span>;</td>
      </tr>
      <tr>
        <td id="L68" class="blob-num js-line-number" data-line-number="68"></td>
        <td id="LC68" class="blob-code blob-code-inner js-file-line">					<span class="pl-en">fnCallbackDraw</span>( oSettings );</td>
      </tr>
      <tr>
        <td id="L69" class="blob-num js-line-number" data-line-number="69"></td>
        <td id="LC69" class="blob-code blob-code-inner js-file-line">					<span class="pl-c1">setTimeout</span>( <span class="pl-k">function</span>() { <span class="pl-en">innerLoop</span>(); }, iTween );</td>
      </tr>
      <tr>
        <td id="L70" class="blob-num js-line-number" data-line-number="70"></td>
        <td id="LC70" class="blob-code blob-code-inner js-file-line">				} <span class="pl-k">else</span> {</td>
      </tr>
      <tr>
        <td id="L71" class="blob-num js-line-number" data-line-number="71"></td>
        <td id="LC71" class="blob-code blob-code-inner js-file-line">					<span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">=</span> <span class="pl-k">-</span><span class="pl-c1">1</span>;</td>
      </tr>
      <tr>
        <td id="L72" class="blob-num js-line-number" data-line-number="72"></td>
        <td id="LC72" class="blob-code blob-code-inner js-file-line">				}</td>
      </tr>
      <tr>
        <td id="L73" class="blob-num js-line-number" data-line-number="73"></td>
        <td id="LC73" class="blob-code blob-code-inner js-file-line">			};</td>
      </tr>
      <tr>
        <td id="L74" class="blob-num js-line-number" data-line-number="74"></td>
        <td id="LC74" class="blob-code blob-code-inner js-file-line">			<span class="pl-en">innerLoop</span>();</td>
      </tr>
      <tr>
        <td id="L75" class="blob-num js-line-number" data-line-number="75"></td>
        <td id="LC75" class="blob-code blob-code-inner js-file-line">		} );</td>
      </tr>
      <tr>
        <td id="L76" class="blob-num js-line-number" data-line-number="76"></td>
        <td id="LC76" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L77" class="blob-num js-line-number" data-line-number="77"></td>
        <td id="LC77" class="blob-code blob-code-inner js-file-line">		<span class="pl-smi">oSettings</span>.<span class="pl-smi">oApi</span>.<span class="pl-en">_fnBindAction</span>( nNext, {action<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">&quot;</span>next<span class="pl-pds">&quot;</span></span>}, <span class="pl-k">function</span>() {</td>
      </tr>
      <tr>
        <td id="L78" class="blob-num js-line-number" data-line-number="78"></td>
        <td id="LC78" class="blob-code blob-code-inner js-file-line">			<span class="pl-c">/* Disallow paging event during a current paging event */</span></td>
      </tr>
      <tr>
        <td id="L79" class="blob-num js-line-number" data-line-number="79"></td>
        <td id="LC79" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">if</span> ( <span class="pl-k">typeof</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">!=</span> <span class="pl-s"><span class="pl-pds">&#39;</span>undefined<span class="pl-pds">&#39;</span></span> <span class="pl-k">&amp;&amp;</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">!=</span> <span class="pl-k">-</span><span class="pl-c1">1</span> )</td>
      </tr>
      <tr>
        <td id="L80" class="blob-num js-line-number" data-line-number="80"></td>
        <td id="LC80" class="blob-code blob-code-inner js-file-line">			{</td>
      </tr>
      <tr>
        <td id="L81" class="blob-num js-line-number" data-line-number="81"></td>
        <td id="LC81" class="blob-code blob-code-inner js-file-line">				<span class="pl-k">return</span>;</td>
      </tr>
      <tr>
        <td id="L82" class="blob-num js-line-number" data-line-number="82"></td>
        <td id="LC82" class="blob-code blob-code-inner js-file-line">			}</td>
      </tr>
      <tr>
        <td id="L83" class="blob-num js-line-number" data-line-number="83"></td>
        <td id="LC83" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L84" class="blob-num js-line-number" data-line-number="84"></td>
        <td id="LC84" class="blob-code blob-code-inner js-file-line">			<span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">=</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayStart</span>;</td>
      </tr>
      <tr>
        <td id="L85" class="blob-num js-line-number" data-line-number="85"></td>
        <td id="LC85" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L86" class="blob-num js-line-number" data-line-number="86"></td>
        <td id="LC86" class="blob-code blob-code-inner js-file-line">			<span class="pl-c">/* Make sure we are not over running the display array */</span></td>
      </tr>
      <tr>
        <td id="L87" class="blob-num js-line-number" data-line-number="87"></td>
        <td id="LC87" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">if</span> ( <span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayStart</span> <span class="pl-k">+</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayLength</span> <span class="pl-k">&lt;</span> <span class="pl-smi">oSettings</span>.<span class="pl-en">fnRecordsDisplay</span>() )</td>
      </tr>
      <tr>
        <td id="L88" class="blob-num js-line-number" data-line-number="88"></td>
        <td id="LC88" class="blob-code blob-code-inner js-file-line">			{</td>
      </tr>
      <tr>
        <td id="L89" class="blob-num js-line-number" data-line-number="89"></td>
        <td id="LC89" class="blob-code blob-code-inner js-file-line">				<span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingEnd</span> <span class="pl-k">=</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayStart</span> <span class="pl-k">+</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayLength</span>;</td>
      </tr>
      <tr>
        <td id="L90" class="blob-num js-line-number" data-line-number="90"></td>
        <td id="LC90" class="blob-code blob-code-inner js-file-line">			}</td>
      </tr>
      <tr>
        <td id="L91" class="blob-num js-line-number" data-line-number="91"></td>
        <td id="LC91" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L92" class="blob-num js-line-number" data-line-number="92"></td>
        <td id="LC92" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">var</span> iTween <span class="pl-k">=</span> <span class="pl-smi">$</span>.<span class="pl-smi">fn</span>.<span class="pl-smi">dataTableExt</span>.<span class="pl-smi">oPagination</span>.<span class="pl-smi">iTweenTime</span>;</td>
      </tr>
      <tr>
        <td id="L93" class="blob-num js-line-number" data-line-number="93"></td>
        <td id="LC93" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">var</span> <span class="pl-en">innerLoop</span> <span class="pl-k">=</span> <span class="pl-k">function</span> () {</td>
      </tr>
      <tr>
        <td id="L94" class="blob-num js-line-number" data-line-number="94"></td>
        <td id="LC94" class="blob-code blob-code-inner js-file-line">				<span class="pl-k">if</span> ( <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">&lt;</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingEnd</span> ) {</td>
      </tr>
      <tr>
        <td id="L95" class="blob-num js-line-number" data-line-number="95"></td>
        <td id="LC95" class="blob-code blob-code-inner js-file-line">					<span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span><span class="pl-k">++</span>;</td>
      </tr>
      <tr>
        <td id="L96" class="blob-num js-line-number" data-line-number="96"></td>
        <td id="LC96" class="blob-code blob-code-inner js-file-line">					<span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayStart</span> <span class="pl-k">=</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span>;</td>
      </tr>
      <tr>
        <td id="L97" class="blob-num js-line-number" data-line-number="97"></td>
        <td id="LC97" class="blob-code blob-code-inner js-file-line">					<span class="pl-en">fnCallbackDraw</span>( oSettings );</td>
      </tr>
      <tr>
        <td id="L98" class="blob-num js-line-number" data-line-number="98"></td>
        <td id="LC98" class="blob-code blob-code-inner js-file-line">					<span class="pl-c1">setTimeout</span>( <span class="pl-k">function</span>() { <span class="pl-en">innerLoop</span>(); }, iTween );</td>
      </tr>
      <tr>
        <td id="L99" class="blob-num js-line-number" data-line-number="99"></td>
        <td id="LC99" class="blob-code blob-code-inner js-file-line">				} <span class="pl-k">else</span> {</td>
      </tr>
      <tr>
        <td id="L100" class="blob-num js-line-number" data-line-number="100"></td>
        <td id="LC100" class="blob-code blob-code-inner js-file-line">					<span class="pl-smi">oSettings</span>.<span class="pl-smi">iPagingLoopStart</span> <span class="pl-k">=</span> <span class="pl-k">-</span><span class="pl-c1">1</span>;</td>
      </tr>
      <tr>
        <td id="L101" class="blob-num js-line-number" data-line-number="101"></td>
        <td id="LC101" class="blob-code blob-code-inner js-file-line">				}</td>
      </tr>
      <tr>
        <td id="L102" class="blob-num js-line-number" data-line-number="102"></td>
        <td id="LC102" class="blob-code blob-code-inner js-file-line">			};</td>
      </tr>
      <tr>
        <td id="L103" class="blob-num js-line-number" data-line-number="103"></td>
        <td id="LC103" class="blob-code blob-code-inner js-file-line">			<span class="pl-en">innerLoop</span>();</td>
      </tr>
      <tr>
        <td id="L104" class="blob-num js-line-number" data-line-number="104"></td>
        <td id="LC104" class="blob-code blob-code-inner js-file-line">		} );</td>
      </tr>
      <tr>
        <td id="L105" class="blob-num js-line-number" data-line-number="105"></td>
        <td id="LC105" class="blob-code blob-code-inner js-file-line">	},</td>
      </tr>
      <tr>
        <td id="L106" class="blob-num js-line-number" data-line-number="106"></td>
        <td id="LC106" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L107" class="blob-num js-line-number" data-line-number="107"></td>
        <td id="LC107" class="blob-code blob-code-inner js-file-line">	<span class="pl-s"><span class="pl-pds">&quot;</span><span class="pl-en">fnUpdate</span><span class="pl-pds">&quot;</span></span><span class="pl-k">:</span> <span class="pl-k">function</span> ( <span class="pl-smi">oSettings</span>, <span class="pl-smi">fnCallbackDraw</span> )</td>
      </tr>
      <tr>
        <td id="L108" class="blob-num js-line-number" data-line-number="108"></td>
        <td id="LC108" class="blob-code blob-code-inner js-file-line">	{</td>
      </tr>
      <tr>
        <td id="L109" class="blob-num js-line-number" data-line-number="109"></td>
        <td id="LC109" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">if</span> ( <span class="pl-k">!</span><span class="pl-smi">oSettings</span>.<span class="pl-smi">aanFeatures</span>.<span class="pl-smi">p</span> )</td>
      </tr>
      <tr>
        <td id="L110" class="blob-num js-line-number" data-line-number="110"></td>
        <td id="LC110" class="blob-code blob-code-inner js-file-line">		{</td>
      </tr>
      <tr>
        <td id="L111" class="blob-num js-line-number" data-line-number="111"></td>
        <td id="LC111" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">return</span>;</td>
      </tr>
      <tr>
        <td id="L112" class="blob-num js-line-number" data-line-number="112"></td>
        <td id="LC112" class="blob-code blob-code-inner js-file-line">		}</td>
      </tr>
      <tr>
        <td id="L113" class="blob-num js-line-number" data-line-number="113"></td>
        <td id="LC113" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L114" class="blob-num js-line-number" data-line-number="114"></td>
        <td id="LC114" class="blob-code blob-code-inner js-file-line">		<span class="pl-c">/* Loop over each instance of the pager */</span></td>
      </tr>
      <tr>
        <td id="L115" class="blob-num js-line-number" data-line-number="115"></td>
        <td id="LC115" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">var</span> an <span class="pl-k">=</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">aanFeatures</span>.<span class="pl-smi">p</span>;</td>
      </tr>
      <tr>
        <td id="L116" class="blob-num js-line-number" data-line-number="116"></td>
        <td id="LC116" class="blob-code blob-code-inner js-file-line">		<span class="pl-k">for</span> ( <span class="pl-k">var</span> i<span class="pl-k">=</span><span class="pl-c1">0</span>, iLen<span class="pl-k">=</span><span class="pl-smi">an</span>.<span class="pl-c1">length</span> ; i<span class="pl-k">&lt;</span>iLen ; i<span class="pl-k">++</span> )</td>
      </tr>
      <tr>
        <td id="L117" class="blob-num js-line-number" data-line-number="117"></td>
        <td id="LC117" class="blob-code blob-code-inner js-file-line">		{</td>
      </tr>
      <tr>
        <td id="L118" class="blob-num js-line-number" data-line-number="118"></td>
        <td id="LC118" class="blob-code blob-code-inner js-file-line">			<span class="pl-k">if</span> ( an[i].<span class="pl-c1">childNodes</span>.<span class="pl-c1">length</span> <span class="pl-k">!==</span> <span class="pl-c1">0</span> )</td>
      </tr>
      <tr>
        <td id="L119" class="blob-num js-line-number" data-line-number="119"></td>
        <td id="LC119" class="blob-code blob-code-inner js-file-line">			{</td>
      </tr>
      <tr>
        <td id="L120" class="blob-num js-line-number" data-line-number="120"></td>
        <td id="LC120" class="blob-code blob-code-inner js-file-line">				an[i].<span class="pl-c1">childNodes</span>[<span class="pl-c1">0</span>].<span class="pl-c1">className</span> <span class="pl-k">=</span></td>
      </tr>
      <tr>
        <td id="L121" class="blob-num js-line-number" data-line-number="121"></td>
        <td id="LC121" class="blob-code blob-code-inner js-file-line">					( <span class="pl-smi">oSettings</span>.<span class="pl-smi">_iDisplayStart</span> <span class="pl-k">===</span> <span class="pl-c1">0</span> ) <span class="pl-k">?</span></td>
      </tr>
      <tr>
        <td id="L122" class="blob-num js-line-number" data-line-number="122"></td>
        <td id="LC122" class="blob-code blob-code-inner js-file-line">					<span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPagePrevDisabled</span> <span class="pl-k">:</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPagePrevEnabled</span>;</td>
      </tr>
      <tr>
        <td id="L123" class="blob-num js-line-number" data-line-number="123"></td>
        <td id="LC123" class="blob-code blob-code-inner js-file-line">
</td>
      </tr>
      <tr>
        <td id="L124" class="blob-num js-line-number" data-line-number="124"></td>
        <td id="LC124" class="blob-code blob-code-inner js-file-line">				an[i].<span class="pl-c1">childNodes</span>[<span class="pl-c1">1</span>].<span class="pl-c1">className</span> <span class="pl-k">=</span></td>
      </tr>
      <tr>
        <td id="L125" class="blob-num js-line-number" data-line-number="125"></td>
        <td id="LC125" class="blob-code blob-code-inner js-file-line">					( <span class="pl-smi">oSettings</span>.<span class="pl-en">fnDisplayEnd</span>() <span class="pl-k">==</span> <span class="pl-smi">oSettings</span>.<span class="pl-en">fnRecordsDisplay</span>() ) <span class="pl-k">?</span></td>
      </tr>
      <tr>
        <td id="L126" class="blob-num js-line-number" data-line-number="126"></td>
        <td id="LC126" class="blob-code blob-code-inner js-file-line">					<span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPageNextDisabled</span> <span class="pl-k">:</span> <span class="pl-smi">oSettings</span>.<span class="pl-smi">oClasses</span>.<span class="pl-smi">sPageNextEnabled</span>;</td>
      </tr>
      <tr>
        <td id="L127" class="blob-num js-line-number" data-line-number="127"></td>
        <td id="LC127" class="blob-code blob-code-inner js-file-line">			}</td>
      </tr>
      <tr>
        <td id="L128" class="blob-num js-line-number" data-line-number="128"></td>
        <td id="LC128" class="blob-code blob-code-inner js-file-line">		}</td>
      </tr>
      <tr>
        <td id="L129" class="blob-num js-line-number" data-line-number="129"></td>
        <td id="LC129" class="blob-code blob-code-inner js-file-line">	}</td>
      </tr>
      <tr>
        <td id="L130" class="blob-num js-line-number" data-line-number="130"></td>
        <td id="LC130" class="blob-code blob-code-inner js-file-line">};</td>
      </tr>
</table>

  </div>

</div>

<a href="#jump-to-line" rel="facebox[.linejump]" data-hotkey="l" style="display:none">Jump to Line</a>
<div id="jump-to-line" style="display:none">
  <!-- </textarea> --><!-- '"` --><form accept-charset="UTF-8" action="" class="js-jump-to-line-form" method="get"><div style="margin:0;padding:0;display:inline"><input name="utf8" type="hidden" value="&#x2713;" /></div>
    <input class="linejump-input js-jump-to-line-field" type="text" placeholder="Jump to line&hellip;" aria-label="Jump to line" autofocus>
    <button type="submit" class="btn">Go</button>
</form></div>

  </div>
  <div class="modal-backdrop"></div>
</div>

    </div>
  </div>

    </div>

        <div class="container">
  <div class="site-footer" role="contentinfo">
    <ul class="site-footer-links right">
        <li><a href="https://status.github.com/" data-ga-click="Footer, go to status, text:status">Status</a></li>
      <li><a href="https://developer.github.com" data-ga-click="Footer, go to api, text:api">API</a></li>
      <li><a href="https://training.github.com" data-ga-click="Footer, go to training, text:training">Training</a></li>
      <li><a href="https://shop.github.com" data-ga-click="Footer, go to shop, text:shop">Shop</a></li>
        <li><a href="https://github.com/blog" data-ga-click="Footer, go to blog, text:blog">Blog</a></li>
        <li><a href="https://github.com/about" data-ga-click="Footer, go to about, text:about">About</a></li>
        <li><a href="https://github.com/pricing" data-ga-click="Footer, go to pricing, text:pricing">Pricing</a></li>

    </ul>

    <a href="https://github.com" aria-label="Homepage">
      <span class="mega-octicon octicon-mark-github"></span>
</a>
    <ul class="site-footer-links">
      <li>&copy; 2015 <span title="0.10316s from github-fe127-cp1-prd.iad.github.net">GitHub</span>, Inc.</li>
        <li><a href="https://github.com/site/terms" data-ga-click="Footer, go to terms, text:terms">Terms</a></li>
        <li><a href="https://github.com/site/privacy" data-ga-click="Footer, go to privacy, text:privacy">Privacy</a></li>
        <li><a href="https://github.com/security" data-ga-click="Footer, go to security, text:security">Security</a></li>
        <li><a href="https://github.com/contact" data-ga-click="Footer, go to contact, text:contact">Contact</a></li>
        <li><a href="https://help.github.com" data-ga-click="Footer, go to help, text:help">Help</a></li>
    </ul>
  </div>
</div>



    
    
    

    <div id="ajax-error-message" class="flash flash-error">
      <span class="octicon octicon-alert"></span>
      <button type="button" class="flash-close js-flash-close js-ajax-error-dismiss" aria-label="Dismiss error">
        <span class="octicon octicon-x"></span>
      </button>
      Something went wrong with that request. Please try again.
    </div>


      <script crossorigin="anonymous" integrity="sha256-t8lSPZPmzQI1oKi30aaR95CdODTNnJyqexZ0ulCLZEw=" src="https://assets-cdn.github.com/assets/frameworks-b7c9523d93e6cd0235a0a8b7d1a691f7909d3834cd9c9caa7b1674ba508b644c.js"></script>
      <script async="async" crossorigin="anonymous" integrity="sha256-mDesZq0g4zU/6kBVI54O6TVQPy8sMtLidtRFkEqkvxU=" src="https://assets-cdn.github.com/assets/github-9837ac66ad20e3353fea4055239e0ee935503f2f2c32d2e276d445904aa4bf15.js"></script>
      
      
      
    <div class="js-stale-session-flash stale-session-flash flash flash-warn flash-banner hidden">
      <span class="octicon octicon-alert"></span>
      <span class="signed-in-tab-flash">You signed in with another tab or window. <a href="">Reload</a> to refresh your session.</span>
      <span class="signed-out-tab-flash">You signed out in another tab or window. <a href="">Reload</a> to refresh your session.</span>
    </div>
  </body>
</html>

