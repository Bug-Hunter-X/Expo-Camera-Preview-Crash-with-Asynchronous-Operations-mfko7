# Expo Camera Preview Crash with Async Operations

This repository demonstrates a bug in Expo's Camera API where the preview may crash or fail to render properly when combined with asynchronous tasks.  The problem arises from a race condition: if an asynchronous operation completes after the camera component has unmounted, the update attempt leads to errors. This README explains the issue and provides a solution.

## Problem

The `bug.js` file shows how the camera preview can fail if a simulated API call resolves after the component is unmounted. The result is often a blank screen or a crash.

## Solution

The `bugSolution.js` file presents a solution using the `useEffect` hook's cleanup function. This function cancels the asynchronous operation when the component unmounts, preventing race conditions.