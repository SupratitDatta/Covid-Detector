import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SignIn from './SignIn';
import "../css/navbar.css";

function Navbar() {
    useEffect(() => {
        function test() {
            var tabsNewAnim = document.getElementById("navbarSupportedContent");
            var selectorNewAnim = tabsNewAnim.querySelectorAll("li").length;
            var activeItemNewAnim = tabsNewAnim.querySelector(".active");
            var activeWidthNewAnimHeight = activeItemNewAnim.offsetHeight;
            var activeWidthNewAnimWidth = activeItemNewAnim.offsetWidth;
            var itemPosNewAnimTop = activeItemNewAnim.offsetTop;
            var itemPosNewAnimLeft = activeItemNewAnim.offsetLeft;
            document.querySelector(".hori-selector").style.cssText = `
                top: ${itemPosNewAnimTop}px;
                left: ${itemPosNewAnimLeft}px;
                height: ${activeWidthNewAnimHeight}px;
                width: ${activeWidthNewAnimWidth}px;
            `;

            tabsNewAnim.addEventListener("click", function (e) {
                var target = e.target.closest("li");
                if (!target) return;

                var lis = tabsNewAnim.querySelectorAll("li");
                lis.forEach((li) => li.classList.remove("active"));
                target.classList.add("active");

                var activeWidthNewAnimHeight = target.offsetHeight;
                var activeWidthNewAnimWidth = target.offsetWidth;
                var itemPosNewAnimTop = target.offsetTop;
                var itemPosNewAnimLeft = target.offsetLeft;
                document.querySelector(".hori-selector").style.cssText = `
                    top: ${itemPosNewAnimTop}px;
                    left: ${itemPosNewAnimLeft}px;
                    height: ${activeWidthNewAnimHeight}px;
                    width: ${activeWidthNewAnimWidth}px;
                `;
            });
        }

        test();

        window.addEventListener("resize", function () {
            setTimeout(test, 500);
        });

        document
            .querySelector(".navbar-toggler")
            .addEventListener("click", function () {
                document.querySelector(".navbar-collapse").classList.toggle("show");
                setTimeout(test);
            });

        var path = window.location.pathname.split("/").pop();

        if (path === "") {
            path = "index.html";
        }

        var target = document.querySelector(
            `#navbarSupportedContent ul li a[href="${path}"]`
        );

        if (target) {
            target.parentElement.classList.add("active");
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-custom navbar-mainbg">
            <button
                className="navbar-toggler"
                type="button"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <i className="fas fa-bars text-white"></i>
            </button>
            <div className="nav">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <div className="hori-selector">
                            <div className="left"></div>
                            <div className="right"></div>
                        </div>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e) => e.preventDefault()}>
                                <i className="fas fa-tachometer-alt"></i>Home
                            </a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" onClick={(e) => e.preventDefault()}>
                                <i className="far fa-address-book"></i>About Us
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e) => e.preventDefault()}>
                                <i className="far fa-clone"></i>Our Products
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" onClick={(e) => e.preventDefault()}>
                                <i className="far fa-calendar-alt"></i>Contact Us
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="signlog">
                    <button className="login">
                        Log In
                    </button>
                    <button className="signin">
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;