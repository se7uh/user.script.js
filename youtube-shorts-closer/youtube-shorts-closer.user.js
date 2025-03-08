// ==UserScript==
// @name         YouTube Shorts Auto Closer
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically closes YouTube Shorts pages after daily limit
// @author       se7
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @match        https://www.youtube.com/shorts/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    const DAILY_LIMIT_MINUTES = 40;
    const WARNING_BEFORE_CLOSE = 10; // Show warning 10 seconds before closing
    let closeTimer;
    let warningTimer;
    let warningShown = false;
    let countdownInterval;
    let timerDisplay;
    let currentShortsId = '';
    let timeTrackingInterval;

    // Storage keys
    const STORAGE_KEYS = {
        dailyTime: 'shortsTimeToday',
        lastDate: 'shortsLastDate'
    };

    // Get today's date in YYYY-MM-DD format
    const getTodayDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    // Reset daily time if it's a new day
    const checkAndResetDaily = () => {
        const lastDate = GM_getValue(STORAGE_KEYS.lastDate, '');
        const today = getTodayDate();
        
        if (lastDate !== today) {
            GM_setValue(STORAGE_KEYS.dailyTime, 0);
            GM_setValue(STORAGE_KEYS.lastDate, today);
        }
    };

    // Get remaining daily time in seconds
    const getRemainingDailyTime = () => {
        checkAndResetDaily();
        const timeSpentToday = GM_getValue(STORAGE_KEYS.dailyTime, 0);
        return Math.max(0, DAILY_LIMIT_MINUTES * 60 - timeSpentToday);
    };

    // Update daily time spent
    const updateDailyTime = () => {
        checkAndResetDaily();
        const currentTime = GM_getValue(STORAGE_KEYS.dailyTime, 0);
        GM_setValue(STORAGE_KEYS.dailyTime, currentTime + 1);
        
        const remainingTime = getRemainingDailyTime();
        updateTimerDisplay(remainingTime);
        
        // Check if we've reached the limit
        if (remainingTime <= WARNING_BEFORE_CLOSE && !warningShown) {
            showWarning();
        }
        
        if (remainingTime <= 0) {
            window.close();
        }
    };

    // Create timer display
    const createTimerDisplay = () => {
        const timer = document.createElement('div');
        timer.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 20px;
            z-index: 9999;
            font-family: 'YouTube Sans', Arial, sans-serif;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
            backdrop-filter: blur(5px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        `;

        // Create SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "20");
        svg.setAttribute("height", "20");
        svg.setAttribute("viewBox", "0 0 24 24");
        svg.setAttribute("fill", "currentColor");

        const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("d", "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z");
        
        const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path2.setAttribute("d", "M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z");

        svg.appendChild(path1);
        svg.appendChild(path2);

        const span = document.createElement('span');
        span.textContent = 'Daily time left: ';
        
        const strong = document.createElement('strong');
        strong.textContent = '00:00';
        
        span.appendChild(strong);
        timer.appendChild(svg);
        timer.appendChild(span);

        return timer;
    };

    // Create warning notification element
    const createWarning = () => {
        const warning = document.createElement('div');
        warning.style.cssText = `
            position: fixed;
            bottom: 140px;
            right: 20px;
            background: rgba(255, 0, 0, 0.9);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-family: 'YouTube Sans', Arial, sans-serif;
            font-size: 14px;
            animation: fadeIn 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
            backdrop-filter: blur(5px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;

        const warningIcon = document.createElement('span');
        warningIcon.textContent = '⚠️';

        const contentDiv = document.createElement('div');

        const titleDiv = document.createElement('div');
        titleDiv.style.fontWeight = 'bold';
        titleDiv.style.marginBottom = '4px';
        titleDiv.textContent = 'Daily limit almost reached!';

        const countdownDiv = document.createElement('div');
        const countdownText = document.createElement('span');
        countdownText.textContent = 'Closing in: ';
        const countdownSpan = document.createElement('span');
        countdownSpan.className = 'countdown';
        countdownSpan.textContent = '10';
        const secondsText = document.createElement('span');
        secondsText.textContent = ' seconds';

        countdownDiv.appendChild(countdownText);
        countdownDiv.appendChild(countdownSpan);
        countdownDiv.appendChild(secondsText);

        contentDiv.appendChild(titleDiv);
        contentDiv.appendChild(countdownDiv);

        warning.appendChild(warningIcon);
        warning.appendChild(contentDiv);

        return warning;
    };

    // Update timer display
    const updateTimerDisplay = (remainingTime) => {
        if (!timerDisplay) return;
        
        const minutes = Math.floor(remainingTime / 60);
        const seconds = remainingTime % 60;
        // Format as MM:SS
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const strongElement = timerDisplay.querySelector('strong');
        if (strongElement) {
            strongElement.textContent = timeString;
            
            // Change color based on remaining time
            if (minutes < 5) {
                strongElement.style.color = '#ff4444';
            } else if (minutes < 10) {
                strongElement.style.color = '#ffd700';
            } else {
                strongElement.style.color = '#fff';
            }
        }
    };

    // Function to show warning with countdown
    const showWarning = () => {
        if (!warningShown) {
            const warning = createWarning();
            document.body.appendChild(warning);
            warningShown = true;

            let countdown = WARNING_BEFORE_CLOSE;
            const countdownElement = warning.querySelector('.countdown');
            
            countdownInterval = setInterval(() => {
                countdown--;
                if (countdownElement) {
                    countdownElement.textContent = countdown.toString();
                }
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                }
            }, 1000);
        }
    };

    // Function to get shorts ID from URL
    const getShortsIdFromUrl = (url) => {
        const match = url.match(/\/shorts\/([^/?]+)/);
        return match ? match[1] : null;
    };

    // Function to start timers
    const startTimers = () => {
        // Clear any existing timers
        if (closeTimer) clearTimeout(closeTimer);
        if (warningTimer) clearTimeout(warningTimer);
        if (countdownInterval) clearInterval(countdownInterval);
        if (timeTrackingInterval) clearInterval(timeTrackingInterval);
        warningShown = false;

        // Check remaining daily time
        const remainingTime = getRemainingDailyTime();
        if (remainingTime <= 0) {
            window.close();
            return;
        }

        // Remove any existing warnings
        const existingWarning = document.querySelector('.shorts-warning');
        if (existingWarning) {
            existingWarning.remove();
        }

        // Create or update timer display
        if (!timerDisplay) {
            timerDisplay = createTimerDisplay();
            document.body.appendChild(timerDisplay);
        }

        // Start time tracking
        timeTrackingInterval = setInterval(updateDailyTime, 1000);

        // Initial timer display update
        updateTimerDisplay(remainingTime);
    };

    // Start initial timers and set initial shorts ID
    currentShortsId = getShortsIdFromUrl(window.location.href);
    startTimers();

    // Reset timers when URL changes (for SPA navigation)
    const observer = new MutationObserver(() => {
        const newShortsId = getShortsIdFromUrl(window.location.href);
        // Only reset if we've completely left shorts and come back
        if (!window.location.href.includes('/shorts/')) {
            currentShortsId = null;
            if (timeTrackingInterval) clearInterval(timeTrackingInterval);
        } else if (currentShortsId === null && newShortsId) {
            currentShortsId = newShortsId;
            startTimers();
        }
    });

    // Observe URL changes
    observer.observe(document.querySelector('title'), {
        subtree: true,
        characterData: true,
        childList: true
    });
})(); 