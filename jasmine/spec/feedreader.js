/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements.
 */

$(function () {
    //This suite is all about the RSS
    //feeds definitions, the allFeeds variable in our application.
    describe('RSS Feeds', function () {
        //first test
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //test that loops through each in the allFeeds objects
        //ensures it has a URL defined and it not empty
        it('URL defined and the URL is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe(0);
            })
        })

        //test that loops through each feed and ensures name is defined and not empty
        it('name is defined and name is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(typeof feed.name).toEqual('string');
                expect(feed.name.length).toBeGreaterThan(0);
            })
        })
    });


    /* TODO: Write a new test suite named "The menu" */


    //test suite called 'The Menu'
    describe('The menu', function () {

        //check if menu is hidden by default
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })


        //test to ensure the menu is visible when icon clicked
        it('is displayed when hamburger icon clicked', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
        })

        //test to ensure the menu is hidden if icon clicked again
        it('is hidden when hamburger icon clicked again', function () {
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        })
    })

    //Test suite 'Initial Entries
    describe('Initial Entries', function () {
        //allows testing async function using beforeEach
        beforeEach(function (done) {
            loadFeed(0, function () {
                done();
            })
        })

        //test to check there is at least one entry in feed
        it('is called and has at least one feed', function () {
            expect($('.feed .entry').length).toBeGreaterThan(0);
        })
    })

    /* A new test suite named "New Feed Selection" */

    describe('New Feed Selection', function () {
        var feed1;
        var feed2;

        beforeEach(function (done) {
            loadFeed(0, function () {
                feed1 = $('.feed').html();
                done();
            })
        })

        //Test that ensures when a new feed is loaded by the loadFeed function 
        //that the content actually changes
        it('is loaded by loadFeed function and the content actually changes', function (done) {
            loadFeed(1, function () {
                feed2 = $('.feed').html();

                expect(feed2).not.toEqual(feed1);
                done();
            })
        })
    })

}());
