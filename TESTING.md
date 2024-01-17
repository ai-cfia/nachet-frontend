# Testing Documentation

This document provides detailed instructions and procedures for manually testing
the various functionalities of Nachet, ensuring that all features operate
correctly and as expected before deployment or release.

## Test Case: Backend URL Warning Functionality

**Objective:** Verify the application correctly displays a warning if the
               backend URL is not set or is non-responsive.

**Preconditions:**
- [ ] The application is open.
- [ ] Nachet Backend is set up and running locally. The Nachet Backend can be
  found at [Nachet Backend GitHub Repository](https://github.com/ai-cfia/nachet-
  backend). To run the application locally, use the command `hypercorn -b :8080
  app:app` in the terminal.
- [ ] The backend URL environment variable is either not set, empty, or pointing
  to a non-responsive server.

**Test Steps:**
1. Start the application.
2. Observe the application's behavior during initialization.

**Expected Results:**
- [ ] If the backend URL is not correctly configured or the server is non-
  responsive, a warning message should appear at the top of the screen.
- [ ] The warning message should correctly indicate the issue with the backend
  URL.
- [ ] If the backend URL is correctly configured and the server is responsive,
  no warning message should be displayed.

**Actual Results:**
- [ ] Describe the actual outcome of the test.

**Pass/Fail Criteria:**
- [ ] Pass if the warning message accurately reflects the state of the backend
  URL.
- [ ] Fail if no warning is displayed in the case of a misconfigured or non-
  responsive backend, or if a false warning is displayed when the backend is
  correctly configured and responsive.

---

## Testing Capture Button Functionality

### Test 1: Capture Snapshot from Microscope/Camera Device

**Objective:** Ensure that the capture button takes a snapshot of the current
               view from the microscope/camera device.

**Preconditions:**
- [ ] The application is open and the user is logged in (if required).
- [ ] The microscope/camera device is connected and streaming live feed to the
  application.

**Test Steps:**
1. Navigate to the view where the live feed from the microscope/camera device is
displayed.
2. Click on the 'Capture' button to take a snapshot of the current view.

**Expected Results:**
- [ ] Upon clicking 'Capture', a snapshot of the live feed is taken and
  displayed to the user.
- [ ] The 'Capture' button should become inactive or show a visual cue that the
  snapshot has been taken.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the snapshot is successfully taken and displayed.
- [ ] Fail if the snapshot is not taken, not displayed, or the button does not
  react as expected.

---

### Test 2: Capture Button Disabled on Capture Component View

**Objective:** Validate that the capture button is disabled when the user is
               viewing the captured snapshot.

**Preconditions:**
- [ ] A snapshot has been taken and the user is on the Capture component view
  where the snapshot is displayed.

**Test Steps:**
1. Observe the 'Capture' button while on the Capture component view.

**Expected Results:**
- [ ] The 'Capture' button should be visibly disabled or inactive.
- [ ] The user should not be able to click the 'Capture' button again until they
  toggle back to the live feed view.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the 'Capture' button is disabled and cannot be clicked.
- [ ] Fail if the 'Capture' button remains active or can be clicked.

## Testing Switch Button Functionality

### Test 1: Switching Between Webcam Devices

**Objective:** Ensure that the switch button allows the user to change between
               different webcam devices.

**Preconditions:**
- [ ] The application is open and the user is logged in (if required).
- [ ] Multiple webcam devices are connected and recognized by the application.

**Test Steps:**
1. Navigate to the view where the live feed from the webcam is displayed.
2. Click on the 'Switch' button.
3. Observe the popup window listing available webcam devices.
4. Select a different webcam device from the list.
5. Confirm the selection and observe the change in the webcam feed.

**Expected Results:**
- [ ] On clicking 'Switch', a popup window appears listing the available webcam
  devices.
- [ ] The webcam feed updates to show the feed from the selected device.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the webcam feed switches correctly to the selected device.
- [ ] Fail if the feed does not switch, the popup does not appear, or the wrong
  feed is displayed.

---

### Test 2: Switch Button Disabled on Capture Component View

**Objective:** Validate that the switch button is disabled when the user is
               viewing the captured snapshot.

**Preconditions:**
- [ ] The user has navigated to the Capture component view, where a previously
  captured snapshot is displayed.

**Test Steps:**
1. Observe the 'Switch' button while on the Capture component view.

**Expected Results:**
- [ ] The 'Switch' button should be visibly disabled or inactive.
- [ ] The user should not be able to interact with the 'Switch' button while in
  the Capture view.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the 'Switch' button is disabled and not interactive.
- [ ] Fail if the 'Switch' button remains active or can be interacted with.

## Testing Classify Button Functionality

### Test 1: Classification and Result Population

**Objective:** Ensure that the classify button correctly triggers the
               classification process and populates the results in the results
               table.

**Preconditions:**
- [ ] The application is open and the user is logged in (if required).
- [ ] An image or a snapshot is ready for classification.

**Test Steps:**
1. Click on the 'Classify' button after loading an image or taking a snapshot.
2. Wait for a few seconds to allow the classification process to complete.
3. Observe the results table for populated classification results.
4. Check for red boxes overlaying each classified seed in the image.

**Expected Results:**
- [ ] Classification results appear in the results table within a few seconds
  after clicking 'Classify'.
- [ ] Each classified seed in the image is overlaid with a red box.
- [ ] Each red box has an associated number that correlates with an entry in the
  results table.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the results are correctly populated and red boxes appear as
  expected.
- [ ] Fail if the classification takes too long, results do not appear, or
  overlays are incorrect.

---

### Test 2: Classify Button Disabled in Webcam Feed View

**Objective:** Verify that the classify button is disabled when the user is
               viewing the webcam feed.

**Preconditions:**
- [ ] The user is on the webcam feed view, displaying live feed from the camera.

**Test Steps:**
1. Observe the 'Classify' button while in the webcam feed view.

**Expected Results:**
- [ ] The 'Classify' button should be visibly disabled or inactive.
- [ ] The user should not be able to interact with the 'Classify' button in this
  view.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the 'Classify' button is disabled and non-interactive in the
  webcam feed view.
- [ ] Fail if the button remains active or can be interacted with.

## Testing Load Button Functionality

### Test 1: Loading an Image for Classification

**Objective:** Ensure that the load button allows users to select and load an
               image for classification.

**Preconditions:**
- [ ] The application is open and the user is logged in (if required).

**Test Steps:**
1. Click on the 'Load' button.
2. Navigate through the file explorer to find an image for classification.
3. Select an image and confirm the selection.
4. Observe whether the selected image is displayed in the capture component and
added to the Captures table.

**Expected Results:**
- [ ] The file explorer opens upon clicking 'Load'.
- [ ] The selected image is displayed in the capture component.
- [ ] The image is added to the Captures table.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the image is loaded and displayed correctly.
- [ ] Fail if the file explorer does not open, the image is not displayed, or is
  not added to the Captures table.

---

### Test 2: Load Button Disabled in Webcam Feed View

**Objective:** Verify that the load button is disabled when viewing the webcam
               feed.

**Preconditions:**
- [ ] The user is on the webcam feed view.

**Test Steps:**
1. Observe the 'Load' button while in the webcam feed view.

**Expected Results:**
- [ ] The 'Load' button should be visibly disabled or inactive.
- [ ] The user should not be able to interact with the 'Load' button in this
  view.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the 'Load' button is disabled and non-interactive in the webcam
  feed view.
- [ ] Fail if the button remains active or can be interacted with.

## Testing Save Button Functionality

### Test 1: Saving Images and Captures

**Objective:** Ensure that the save button allows users to save images and
               captures locally.

**Preconditions:**
- [ ] The application is open and the user is logged in (if required).
- [ ] An image is loaded or a snapshot is taken for saving.

**Test Steps:**
1. Click on the 'Save' button.
2. In the 'Save Capture' pop-out window, navigate between the 'Capture' and
'Cache' tabs.
3. In the 'Capture' tab, enter a filename and select an image format (PNG,
JPEG).
4. In the 'Cache' tab, select images from the 'Captures' table to be saved.
5. Confirm the save action and observe if the image(s) are saved locally on the
computer.

**Expected Results:**
- [ ] The 'Save Capture' pop-out window appears with options to save the capture
  and cache.
- [ ] The image(s) are saved in the selected format to the local storage.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the images are saved successfully in the chosen format.
- [ ] Fail if the save functionality does not work or the saved images are not
  as expected.

---

### Test 2: Save Button Disabled in Webcam Feed View

**Objective:** Verify that the save button is disabled when viewing the webcam
               feed.

**Preconditions:**
- [ ] The user is on the webcam feed view.

**Test Steps:**
1. Observe the 'Save' button while in the webcam feed view.

**Expected Results:**
- [ ] The 'Save' button should be visibly disabled or inactive.
- [ ] The user should not be able to interact with the 'Save' button in this
  view.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the 'Save' button is disabled and non-interactive in the webcam
  feed view.
- [ ] Fail if the button remains active or can be interacted with.

## Testing Directories Component

### Test 1: Creating a New Directory

**Objective:** Ensure that users can create a new directory successfully.

**Preconditions:**
- [ ] The application is open and the user is logged in (if required).

**Test Steps:**
1. Click on the folder icon with a miniature '+' symbol.
2. Observe the 'Create New Directory' pop-up widget.
3. Enter a new directory name in the provided input field.
4. Click on the 'Create' button to create the new directory.
5. Check the DIRECTORIES table to see if the new directory is listed.

**Expected Results:**
- [ ] The 'Create New Directory' pop-up appears upon clicking the folder icon.
- [ ] A new directory is created and appears in the DIRECTORIES table.
- [ ] The user can cancel the creation process by clicking 'Cancel'.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if a new directory is created and listed correctly.
- [ ] Fail if the directory is not created, does not appear, or the pop-up does
  not function correctly.

---

### Test 2: Deleting a Directory

**Objective:** Verify that users can delete an existing directory.

**Preconditions:**
- [ ] The application is open and the user is logged in (if required).
- [ ] There are existing directories in the DIRECTORIES table.

**Test Steps:**
1. Click on the 'X' button beside a directory name in the DIRECTORIES table.
2. Observe the 'Delete Directory' pop-up widget.
3. Confirm the deletion by clicking on the delete button.
4. Check the DIRECTORIES table to ensure the directory is removed.
5. Optionally, click 'Cancel' to cancel the deletion process.

**Expected Results:**
- [ ] The 'Delete Directory' pop-up appears upon clicking the 'X' button.
- [ ] The selected directory is removed from the DIRECTORIES table upon
  confirmation.
- [ ] The user can cancel the deletion process by clicking 'Cancel'.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the directory is deleted successfully.
- [ ] Fail if the directory is not deleted, or if the pop-up does not function
  correctly.

## Testing Directory Selection and Upload Functionality

### Test 1: Selecting a Directory for Uploads

**Objective:** Ensure that users can select a directory to save new captures or
               uploaded images.

**Preconditions:**
- [ ] The application is open, and the user is logged in (if required).
- [ ] Multiple directories are available for selection.

**Test Steps:**
1. Select a directory from the available list in the DIRECTORIES table.
2. Capture a new image or upload an existing image.
3. Check if the new image is added to the currently selected directory folder.

**Expected Results:**
- [ ] The user can successfully select a directory from the DIRECTORIES table.
- [ ] New captures or uploads are added to the selected directory folder.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if new images are correctly added to the selected directory.
- [ ] Fail if images are not added to the selected directory or if directory
  selection does not work.

---

### Test 2: Emptying the Captures Table

**Objective:** Verify that users can remove all captures from the Captures
               table.

**Preconditions:**
- [ ] The application is open, and the user is logged in (if required).
- [ ] The Captures table contains one or more captures.

**Test Steps:**
1. Click on the trash icon located in the CAPTURES table title header.
2. Confirm the action if prompted.
3. Observe if all captures are removed from the table.

**Expected Results:**
- [ ] All captures are removed from the Captures table upon clicking the trash
  icon.
- [ ] The user is potentially prompted for confirmation before the captures are
  emptied.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if all captures are successfully removed from the table.
- [ ] Fail if captures remain in the table or the trash icon does not function
  as expected.

## Testing Results Component Functionality

### Test 1: Toggling Between Grouped or Individual Reporting

**Objective:** Ensure that users can toggle between grouped and individual
               reporting in the RESULTS table.

**Preconditions:**
- [ ] The application is open, and the user is logged in (if required).
- [ ] The RESULTS table is populated with classification results.

**Test Steps:**
1. Click on the group/ungroup icon in the RESULTS table.
2. Observe the changes in the presentation of the classification results.
3. Toggle between grouped and individual reporting to test both views.

**Expected Results:**
- [ ] Clicking the icon toggles between grouped and individual reporting styles.
- [ ] The RESULTS table correctly displays the data according to the selected
  reporting style.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if toggling between the two reporting styles works correctly.
- [ ] Fail if the table does not update or displays the data incorrectly.

---

### Test 2: Setting Minimum Confidence Threshold via Configuration Widget

**Objective:** Verify that the minimum confidence threshold can be set through a
               Configuration widget.

**Preconditions:**
- [ ] The application is open, and the user is logged in (if required).
- [ ] The RESULTS table is visible with classification results.

**Test Steps:**
1. Click on the configuration icon in the RESULTS table header.
2. In the Configuration widget popup, adjust the slider to set a new minimum
confidence threshold.
3. Observe if the threshold value is updated in real-time in the RESULTS table.

**Expected Results:**
- [ ] The Configuration widget opens with a slider for the minimum confidence
  threshold.
- [ ] Adjusting the slider updates the minimum confidence threshold value in
  real-time.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the confidence threshold updates as expected when adjusted via the
  slider.
- [ ] Fail if the slider does not function, or the threshold value does not
  update.

---

### Future Implementation: Test 3: Selecting Classification Model for Results

**Objective:** (For future implementation) Ensure that users can select a
               classification model and see updated results.

**Preconditions:**
- [ ] The application is open, and the user is logged in (if required).
- [ ] Multiple classification models are available for selection.
- [ ] The RESULTS table is visible with initial classification results.

**Test Steps:**
1. Select a classification model from the available options in the RESULTS
table.
2. Observe the RESULTS table for updates based on the selected model.

**Expected Results:**
- [ ] User can select a model from the available options.
- [ ] The RESULTS table updates to reflect the classification results from the
  chosen model.

**Actual Results:**
- [ ] Describe what actually happened when the test was executed.

**Pass/Fail:**
- [ ] Pass if the RESULTS table updates correctly based on the selected model.
- [ ] Fail if the table does not update or reflects incorrect data.
