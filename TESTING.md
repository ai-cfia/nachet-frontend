# Testing Documentation

([*Le français est disponible au bas de la page*](#documentation-des-tests))

This document provides detailed instructions and procedures for manually testing
Nachet's various functionalities, ensuring that all features operate correctly
and as expected before deployment or release.

## Testing Backend URL Warning Functionality

### Objective

Verify the application correctly displays a warning if the backend URL is not
set or is non-responsive.

### Preconditions

- [ ] The application is open.
- [ ] Nachet Backend is set up and running locally. The Nachet Backend can be
found at: [Nachet Backend GitHub
Repository](https://github.com/ai-cfia/nachet-backend). To run the application
locally, use the command `hypercorn -b :8080 app:app` in the terminal.
- [ ] The backend URL environment variable is either not set, empty, or pointing
to a non-responsive server.

### Test Steps

1. Start the application.
2. Observe the application's behavior during initialization.

### Expected Results

- [ ] If the backend URL is not correctly configured or the server is non-
responsive, a warning message should appear at the top of the screen.
- [ ] The warning message should correctly indicate the issue with the backend
URL.
- [ ] If the backend URL is correctly configured and the server is responsive,
no warning message should be displayed.

### Actual Results

- [ ] Describe the actual outcome of the test.

### Pass/Fail

- [ ] Pass if the warning message accurately reflects the state of the backend
URL.
- [ ] Fail if no warning is displayed in the case of a misconfigured or non-
responsive backend, or if a false warning is displayed when the backend is
correctly configured and responsive.

## Testing Capture Button Functionality

### Test 1: Capture Snapshot from Microscope/Camera Device

#### Objective

Ensure that the capture button takes a snapshot of the current view from the
microscope/camera device.

#### Preconditions

- [ ] The application is open and the user is logged in (if required).
- [ ] The microscope/camera device is connected and streaming live feed to the
application.

#### Test Steps

1. Navigate to the view where the live feed from the microscope/camera device is
displayed.
2. Click on the 'Capture' button to take a snapshot of the current view.

#### Expected Results

- [ ] Upon clicking 'Capture', a snapshot of the live feed is taken and
displayed to the user.
- [ ] The 'Capture' button should become inactive or show a visual cue that the
snapshot has been taken.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the snapshot is successfully taken and displayed.
- [ ] Fail if the snapshot is not taken, not displayed, or the button does not
react as expected.

### Test 2: Capture Button Disabled on Capture Component View

#### Objective

Validate that the capture button is disabled when the user is viewing the
captured snapshot.

#### Preconditions

- [ ] A snapshot has been taken and the user is on the Capture component view
where the snapshot is displayed.

#### Test Steps

1. Observe the 'Capture' button while on the Capture component view.

#### Expected Results

- [ ] The 'Capture' button should be visibly disabled or inactive.
- [ ] The user should not be able to click the 'Capture' button again until they
toggle back to the live feed view.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the 'Capture' button is disabled and cannot be clicked.
- [ ] Fail if the 'Capture' button remains active or can be clicked.

## Testing Switch Button Functionality

### Test 1: Switching Between Webcam Devices

#### Objective

Ensure that the switch button allows the user to change between different webcam
devices.

#### Preconditions

- [ ] The application is open and the user is logged in (if required).
- [ ] Multiple webcam devices are connected and recognized by the application.

#### Test Steps

1. Navigate to the view where the live feed from the webcam is displayed.
2. Click on the 'Switch' button.
3. Observe the popup window listing available webcam devices.
4. Select a different webcam device from the list.
5. Confirm the selection and observe the change in the webcam feed.

#### Expected Results

- [ ] On clicking 'Switch', a popup window appears listing the available webcam
devices.
- [ ] The webcam feed updates to show the feed from the selected device.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the webcam feed switches correctly to the selected device.
- [ ] Fail if the feed does not switch, the popup does not appear, or the wrong
feed is displayed.

### Test 2: Switch Button Disabled on Capture Component View

#### Objective

Validate that the switch button is disabled when the user is viewing the
captured snapshot.

#### Preconditions

- [ ] The user has navigated to the Capture component view, where a previously
captured snapshot is displayed.

#### Test Steps

1. Observe the 'Switch' button while on the Capture component view.

#### Expected Results

- [ ] The 'Switch' button should be visibly disabled or inactive.
- [ ] The user should not be able to interact with the 'Switch' button while in
the Capture view.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the 'Switch' button is disabled and not interactive.
- [ ] Fail if the 'Switch' button remains active or can be interacted with.

## Testing Classify Button Functionality

### Test 1: Classification and Result Population

#### Objective

Ensure that the classify button correctly triggers the classification process
and populates the results in the results table.

#### Preconditions

- [ ] The application is open and the user is logged in (if required).
- [ ] An image or a snapshot is ready for classification.

#### Test Steps

1. Click on the 'Classify' button after loading an image or taking a snapshot.
2. Wait for a few seconds to allow the classification process to complete.
3. Observe the results table for populated classification results.
4. Check for red boxes overlaying each classified seed in the image.

#### Expected Results

- [ ] Classification results appear in the results table within a few seconds
after clicking 'Classify'.
- [ ] Each classified seed in the image is overlaid with a red box.
- [ ] Each red box has an associated number that correlates with an entry in the
results table.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the results are correctly populated and red boxes appear as
expected.
- [ ] Fail if the classification takes too long, results do not appear, or
overlays are incorrect.

### Test 2: Classify Button Disabled in Webcam Feed View

#### Objective

Verify that the classify button is disabled when the user is viewing the webcam
feed.

#### Preconditions

- [ ] The user is on the webcam feed view, displaying live feed from the camera.

#### Test Steps

1. Observe the 'Classify' button while in the webcam feed view.

#### Expected Results

- [ ] The 'Classify' button should be visibly disabled or inactive.
- [ ] The user should not be able to interact with the 'Classify' button in this
view.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the 'Classify' button is disabled and non-interactive in the
webcam feed view.
- [ ] Fail if the button remains active or can be interacted with.

## Testing Load Button Functionality

### Test 1: Loading an Image for Classification

#### Objective

Ensure that the load button allows users to select and load an image for
classification.

#### Preconditions

- [ ] The application is open and the user is logged in (if required).

#### Test Steps

1. Click on the 'Load' button.
2. Navigate through the file explorer to find an image for classification.
3. Select an image and confirm the selection.
4. Observe whether the selected image is displayed in the capture component and
added to the Captures table.

#### Expected Results

- [ ] The file explorer opens upon clicking 'Load'.
- [ ] The selected image is displayed in the capture component.
- [ ] The image is added to the Captures table.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the image is loaded and displayed correctly.
- [ ] Fail if the file explorer does not open, the image is not displayed, or is
not added to the Captures table.

### Test 2: Load Button Disabled in Webcam Feed View

#### Objective

Verify that the load button is disabled when viewing the webcam feed.

#### Preconditions

- [ ] The user is on the webcam feed view.

#### Test Steps

1. Observe the 'Load' button while in the webcam feed view.

#### Expected Results

- [ ] The 'Load' button should be visibly disabled or inactive.
- [ ] The user should not be able to interact with the 'Load' button in this
view.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the 'Load' button is disabled and non-interactive in the webcam
feed view.
- [ ] Fail if the button remains active or can be interacted with.

## Testing Save Button Functionality

### Test 1: Saving Images and Captures

#### Objective

Ensure that the save button allows users to save images and captures locally.

#### Preconditions

- [ ] The application is open and the user is logged in (if required).
- [ ] An image is loaded or a snapshot is taken for saving.

#### Test Steps

1. Click on the 'Save' button.
2. In the 'Save Capture' pop-out window, navigate between the 'Capture' and
'Cache' tabs.
3. In the 'Capture' tab, enter a filename and select an image format (PNG,
JPEG).
4. In the 'Cache' tab, select images from the 'Captures' table to be saved.
5. Confirm the save action and observe if the image(s) are saved locally on the
computer.

#### Expected Results

- [ ] The 'Save Capture' pop-out window appears with options to save the capture
and cache.
- [ ] The image(s) are saved in the selected format to the local storage.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the images are saved successfully in the chosen format.
- [ ] Fail if the save functionality does not work or the saved images are not
as expected.

### Test 2: Save Button Disabled in Webcam Feed View

#### Objective

Verify that the save button is disabled when viewing the webcam feed.

#### Preconditions

- [ ] The user is on the webcam feed view.

#### Test Steps

1. Observe the 'Save' button while in the webcam feed view.

#### Expected Results

- [ ] The 'Save' button should be visibly disabled or inactive.
- [ ] The user should not be able to interact with the 'Save' button in this
view.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the 'Save' button is disabled and non-interactive in the webcam
feed view.
- [ ] Fail if the button remains active or can be interacted with.

## Testing Directories Component

### Test 1: Creating a New Directory

#### Objective

Ensure that users can create a new directory successfully.

#### Preconditions

- [ ] The application is open and the user is logged in (if required).

#### Test Steps

1. Click on the folder icon with a miniature '+' symbol.
2. Observe the 'Create New Directory' pop-up widget.
3. Enter a new directory name in the provided input field.
4. Click on the 'Create' button to create the new directory.
5. Check the DIRECTORIES table to see if the new directory is listed.

#### Expected Results

- [ ] The 'Create New Directory' pop-up appears upon clicking the folder icon.
- [ ] A new directory is created and appears in the DIRECTORIES table.
- [ ] The user can cancel the creation process by clicking 'Cancel'.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if a new directory is created and listed correctly.
- [ ] Fail if the directory is not created, does not appear, or the pop-up does
not function correctly.

### Test 2: Deleting a Directory

#### Objective

Verify that users can delete an existing directory.

#### Preconditions

- [ ] The application is open and the user is logged in (if required).
- [ ] There are existing directories in the DIRECTORIES table.

#### Test Steps

1. Click on the 'X' button beside a directory name in the DIRECTORIES table.
2. Observe the 'Delete Directory' pop-up widget.
3. Confirm the deletion by clicking on the delete button.
4. Check the DIRECTORIES table to ensure the directory is removed.
5. Optionally, click 'Cancel' to cancel the deletion process.

#### Expected Results

- [ ] The 'Delete Directory' pop-up appears upon clicking the 'X' button.
- [ ] The selected directory is removed from the DIRECTORIES table upon
confirmation.
- [ ] The user can cancel the deletion process by clicking 'Cancel'.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if the directory is deleted successfully.
- [ ] Fail if the directory is not deleted, or if the pop-up does not function
correctly.

## Testing Directory Selection and Upload Functionality

### Test 1: Selecting a Directory for Uploads

#### Objective

Ensure that users can select a directory to save new captures or uploaded
images.

#### Preconditions

- [ ] The application is open, and the user is logged in (if required).
- [ ] Multiple directories are available for selection.

#### Test Steps

1. Select a directory from the available list in the DIRECTORIES table.
2. Capture a new image or upload an existing image.
3. Check if the new image is added to the currently selected directory folder.

#### Expected Results

- [ ] The user can successfully select a directory from the DIRECTORIES table.
- [ ] New captures or uploads are added to the selected directory folder.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if new images are correctly added to the selected directory.
- [ ] Fail if images are not added to the selected directory or if directory
selection does not work.

### Test 2: Emptying the Captures Table

#### Objective

Verify that users can remove all captures from the Captures table.

#### Preconditions

- [ ] The application is open, and the user is logged in (if required).
- [ ] The Captures table contains one or more captures.

#### Test Steps

1. Click on the trash icon located in the CAPTURES table title header.
2. Confirm the action if prompted.
3. Observe if all captures are removed from the table.

#### Expected Results

- [ ] All captures are removed from the Captures table upon clicking the trash
icon.
- [ ] The user is potentially prompted for confirmation before the captures are
emptied.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if all captures are successfully removed from the table.
- [ ] Fail if captures remain in the table or the trash icon does not function
as expected.

## Testing Results Component Functionality

### Test 1: Toggling Between Grouped or Individual Reporting

#### Objective

Ensure that users can toggle between grouped and individual reporting in the
RESULTS table.

#### Preconditions

- [ ] The application is open, and the user is logged in (if required).
- [ ] The RESULTS table is populated with classification results.

#### Test Steps

1. Click on the group/ungroup icon in the RESULTS table.
2. Observe the changes in the presentation of the classification results.
3. Toggle between grouped and individual reporting to test both views.

#### Expected Results

- [ ] Clicking the icon toggles between grouped and individual reporting styles.
- [ ] The RESULTS table correctly displays the data according to the selected
reporting style.

#### Actual Results

- [ ] Describe what actually happened when the test was executed.

#### Pass/Fail

- [ ] Pass if toggling between the two reporting styles works correctly.
- [ ] Fail if the table does not update or displays the data incorrectly.

## Test Case: Populating Model List Based on Environment Setting

### Objective

Verify that the Results Tuner Popup correctly populates the model list with real
data or test data based on the `VITE_APP_MODE` environment variable.

### Test 1: Populating with Real Data

#### Preconditions

- [ ] The application is open and running.
- [ ] The backend server is operational.
- [ ] The `VITE_APP_MODE` environment variable is set to any value other than
`"test"`.

#### Test Steps

1. Start the application.
2. Navigate to the Results Tuner Popup.
3. Observe the model list to verify that it is populated.
4. Check that the models in the list correspond to data fetched from the backend
server.

#### Expected Results

- [ ] The model list in the Results Tuner Popup is populated with real data
fetched from the backend server.

#### Actual Results

- [ ] Describe the actual outcome of the test.

#### Pass/Fail

- [ ] Pass if the model list displays real data as expected.
- [ ] Fail if the model list does not populate, populates incorrectly, or
displays test data.

### Test 2: Populating with Test Data

#### Preconditions

- [ ] The application is open and running.
- [ ] The `VITE_APP_MODE` environment variable is set to `"test"`.

#### Test Steps

1. Start the application.
2. Navigate to the Results Tuner Popup.
3. Observe the model list to verify that it is populated.
4. Check that the models in the list correspond to the static test data defined
in the application.

#### Expected Results

- [ ] The model list in the Results Tuner Popup is populated with static test
data.

#### Actual Results

- [ ] Describe the actual outcome of the test.

#### Pass/Fail

- [ ] Pass if the model list displays test data as expected.
- [ ] Fail if the model list does not populate, populates incorrectly, or
displays real data.

## Test Case: Enhanced Model Selection and Classification Process

#### Objective

Verify that the application allows users to select a classification model via a
dedicated "Model Selection" button, which opens a popup for model choice. Ensure
that the "CLASSIFY" button triggers an inference request using the selected
model. Additionally, confirm that a loading icon appears during the inference
request and disappears once the request is completed.

### Test 1: Model Selection via Dedicated Button

#### Preconditions

- [ ] The application is open and running.
- [ ] The backend server is operational.

#### Test Steps

1. Click on the "Model Selection" button.
2. Observe the popup to ensure it displays a list of available models.
3. Select a model from the list and close the popup.
4. Verify the selected model is displayed or indicated outside the popup.

#### Expected Results

- [ ] The popup with the list of models appears upon clicking the "Model
Selection" button.
- [ ] The user can successfully select a model, and the selection is visibly
confirmed.

#### Actual Results

- [ ] Describe the actual outcome of the test.

#### Pass/Fail

- [ ] Pass if the model selection popup functions correctly and the user's
selection is clearly indicated.
- [ ] Fail if the popup does not appear, model selection does not work, or the
selected model is not indicated.

### Test 2: Inference Request and Loading Icon Display

#### Preconditions

- [ ] A model has been selected using the "Model Selection" button.
- [ ] The "CLASSIFY" button is enabled.

#### Test Steps

1. Click on the "CLASSIFY" button to start the inference process.
2. Observe the interface for a loading icon indicating the process is in
progress.
3. Wait for the inference request to complete.

#### Expected Results

- [ ] A loading icon appears immediately after the "CLASSIFY" button is clicked,
signaling that the inference request is in progress.
- [ ] The loading icon disappears, and the results of the inference are
displayed once the request completes successfully.

#### Actual Results

- [ ] Describe the actual outcome of the test.

#### Pass/Fail

- [ ] Pass if the loading icon appears during the inference process and
disappears upon completion, followed by the display of inference results.
- [ ] Fail if the loading icon does not appear, remains visible after
completion, or if the inference results are not displayed.

## Test Case: Viewing Top 5 Classification Results

### Objective: Single Row Expansion

Verify that users can view the top 5 classification results by expanding a
single table row at a time in the RESULTS panel.

### Test 1: Single Row Expansion Functionality

#### Objective

Validate the functionality that allows users to expand a single row at a time to
view detailed classification results.

#### Preconditions

- The application is open, and the user is logged in (if required).
- The RESULTS table is populated with classification results.

#### Test Steps

1. Locate a row in the RESULTS table that represents an image classification.
2. Click on the row to trigger the expand functionality.
3. Observe the behavior and check if only the clicked row expands to show
additional information.
4. Click on another row and observe that the previously expanded row collapses
and the new one expands.

#### Expected Results

- Only the clicked row expands upon selection, revealing the top 5
classification results.
- Upon selecting another row, the previously expanded row collapses
automatically, and the new one expands to show its top 5 results.

#### Actual Results

- Describe the actual behavior observed when performing the test steps.

#### Pass/Fail

- Pass if only one row expands at a time and the expansion toggles between rows
correctly.
- Fail if multiple rows can be expanded simultaneously or if the toggling does
not work as expected.

### Test 2: Display Accuracy of Top 5 Results

#### Objective

Verify the accuracy and correct display of the top 5 classification results in
an expanded row.

#### Preconditions

- A row in the RESULTS table is expanded to show the top 5 classification
results.

#### Test Steps

1. Compare the displayed top 5 results with the expected results based on the
data from the backend.
2. Ensure that the labels and scores are correctly displayed.
3. Verify that scores are formatted correctly (e.g., no scientific notation for
small numbers) and match the backend data.

#### Expected Results

- The labels and scores of the top 5 results are correctly displayed as per the
backend data.
- Scores are presented in a readable percentage format.

#### Actual Results

- Describe the actual scores and labels displayed and any discrepancies from
expected data.

#### Pass/Fail

- Pass if the top 5 results are displayed accurately and match the backend data.
- Fail if there are inaccuracies in the labels, scores, or formatting issues.

### Test 3: Consistency and Responsiveness of UI/UX

#### Objective

Assess the UI/UX consistency and responsiveness when expanding and collapsing
rows in the RESULTS table.

#### Preconditions

- At least one row in the RESULTS table can be expanded to view the top 5
classification results.

#### Test Steps

1. Expand a row and then expand another row to ensure that the application only
allows one expanded row at a time.
2. Resize the browser window to test responsiveness and ensure that the expanded
content adjusts appropriately.
3. Navigate away from and back to the RESULTS table to ensure that the expanded
state is not preserved when navigating away.

#### Expected Results

- Only one row can be expanded at any given time, and expanding another row
collapses the previously expanded one.
- The UI layout and expanded content adjust correctly to browser window
resizing.
- The expanded state of a row does not persist when navigating away from the
RESULTS table.

#### Actual Results

- Note any UI glitches, performance issues, or state inconsistencies observed.

#### Pass/Fail

- Pass if the UI maintains quality and functionality throughout the tests,
allowing only one expanded row at a time.
- Fail if the application allows multiple rows to be expanded simultaneously or
if there are issues with the UI layout or state management.

---

## Documentation des tests

Ce document fournit des instructions et des procédures détaillées pour tester
manuellement les différentes fonctionnalités de Nachet, afin de s'assurer que
toutes les fonctionnalités fonctionnent correctement et comme prévu avant le
déploiement ou la publication.

## Tester la fonctionnalité d’avertissement de l’URL du backend

### Objectif

Vérifier que l'application affiche correctement un avertissement si l'URL du
backend n'est pas configurée ou si le serveur est non réactif.

### Préconditions

- [ ] L'application est ouverte.
- [ ] Le backend Nachet est configuré et en cours d'exécution localement. Le
  backend Nachet est disponible ici : [Nachet Backend GitHub
  Repository](https://github.com/ai-cfia/nachet-backend). Pour exécuter
  l'application localement, utilisez la commande `hypercorn -b :8080 app:app`
  dans le terminal.
- [ ] La variable d'environnement contenant l'URL du backend n'est pas définie,
  est vide, ou pointe vers un serveur non réactif.

### Étapes de test

1. Démarrer l'application.
2. Observer le comportement de l'application lors de l'initialisation.

### Résultats attendus

- [ ] Si l'URL du backend n'est pas correctement configurée ou si le serveur est
  non réactif, un message d’avertissement doit apparaître en haut de l’écran.
- [ ] Le message d'avertissement doit indiquer correctement le problème lié à
  l'URL du backend.
- [ ] Si l'URL du backend est correctement configurée et que le serveur est
  réactif, aucun message d'avertissement ne doit être affiché.

### Résultats observés

- [ ] Décrire les résultats réels obtenus pendant le test.

### Succès/Échec

- [ ] Succès si le message d’avertissement reflète avec précision l’état de
  l’URL du backend.
- [ ] Échec si aucun avertissement n'est affiché en cas de backend mal configuré
  ou non réactif, ou si un avertissement erroné est affiché lorsque le backend
  est correctement configuré et réactif.

## Tester la fonctionnalité du bouton de capture

### Test 1 : Capture d’une image via un microscope ou un appareil photo

#### Objectif

Vérifier que le bouton de capture prend une image de la vue actuelle du
microscope ou de l’appareil photo.

#### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si requis).
- [ ] Le microscope ou l’appareil photo est connecté et diffuse un flux en
  direct dans l’application.

#### Étapes de test

1. Naviguer jusqu'à la vue où le flux en direct du microscope ou de l'appareil
   photo est affiché.
2. Cliquer sur le bouton « Capturer » pour prendre une image de la vue actuelle.

#### Résultats attendus

- [ ] Lors du clic sur « Capturer », une image du flux en direct est prise et
  affichée à l'utilisateur.
- [ ] Le bouton « Capturer » doit devenir inactif ou afficher un indicateur
  visuel confirmant que l'image a été prise.

#### Résultats observés

- [ ] Décrire les résultats réels obtenus pendant l'exécution du test.

#### Succès/Échec

- [ ] Succès si l'image est prise et affichée avec succès.
- [ ] Échec si l'image n'est pas prise, non affichée, ou si le bouton ne réagit
  pas comme prévu.

### Test 2 : Désactivation du bouton de capture dans la vue du composant Capture

#### Objectif

Valider que le bouton « Capturer » est désactivé lorsque l'utilisateur est en
train de visualiser l'image capturée.

#### Préconditions

- [ ] Une capture a été effectuée et l'utilisateur est sur la vue du composant
  Capture où l'image capturée est affichée.

#### Étapes de test

1. Observer le bouton « Capturer » pendant que l'utilisateur se trouve dans la
   vue du composant de Capture.

#### Résultats attendus

- [ ] Le bouton « Capturer » doit être visiblement désactivé ou inactif.
- [ ] L'utilisateur ne doit pas pouvoir cliquer à nouveau sur le bouton «
  Capturer » tant qu'il n'est pas revenu à la vue du flux en direct.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si le bouton « Capturer » est désactivé et ne peut pas être cliqué.
- [ ] Échec si le bouton « Capturer » reste actif ou peut être cliqué.

## Test de la fonctionnalité du bouton de changement de périphérique

### Test 1 : Changement entre différents périphériques de webcam

#### Objectif

S'assurer que le bouton « Changer » permet à l'utilisateur de changer de
périphérique de webcam.

#### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).
- [ ] Plusieurs périphériques de webcam sont connectés et reconnus par
  l'application.

#### Étapes de test

1. Accéder à la vue où le flux en direct de la webcam est affiché.
2. Cliquer sur le bouton « Changer ».
3. Observer la fenêtre contextuelle listant les périphériques de webcam
   disponibles.
4. Sélectionner un autre périphérique de webcam dans la liste.
5. Confirmer la sélection et observer le changement dans le flux de la webcam.

#### Résultats attendus

- [ ] En cliquant sur « Changer », une fenêtre contextuelle apparaît, listant
  les périphériques de webcam disponibles.
- [ ] Le flux de la webcam se met à jour pour afficher le flux du périphérique
  sélectionné.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si le flux de la webcam passe correctement au périphérique
  sélectionné.
- [ ] Échec si le flux ne change pas, si la fenêtre contextuelle n'apparaît pas
  ou si un mauvais flux est affiché.

### Test 2 : Désactivation du bouton de changement de périphérique dans la vue du composant de capture

#### Objectif

Valider que le bouton « Changer » est désactivé lorsque l'utilisateur visualise
l'image capturée.

#### Préconditions

- [ ] L'utilisateur a navigué vers la vue du composant de capture où une image
  capturée précédemment est affichée.

#### Étapes de test

1. Observer le bouton « Changer » lorsque l'utilisateur est dans la vue du
   composant de capture.

#### Résultats attendus

- [ ] Le bouton « Changer » doit être visiblement désactivé ou inactif.
- [ ] L'utilisateur ne doit pas pouvoir interagir avec le bouton « Changer »
  dans la vue de capture.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si le bouton « Changer » est désactivé et non interactif.
- [ ] Échec si le bouton « Changer » reste actif ou peut être utilisé.

## Test de la fonctionnalité du bouton Classifier

### Test 1 : Classification et affichage des résultats

#### Objectif

S'assurer que le bouton « Classifier » déclenche correctement le processus de
classification et affiche les résultats dans le tableau des résultats.

#### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).
- [ ] Une image ou un instantané est prêt à être classifié.

#### Étapes de test

1. Cliquer sur le bouton « Classifier » après avoir chargé ou capturé une image.
2. Attendre quelques secondes pour permettre au processus de classification de
   s'exécuter.
3. Observer le tableau des résultats pour vérifier que les résultats de
   classification s'affichent.
4. Vérifier la présence de cadres rouges autour de chaque graine classifiée dans
   l'image.

#### Résultats attendus

- [ ] Les résultats de classification apparaissent dans le tableau des résultats
  en quelques secondes après avoir cliqué sur « Classifier ».
- [ ] Chaque graine classifiée dans l'image est entourée d'un cadre rouge.
- [ ] Chaque cadre rouge est associé à un numéro qui correspond à une entrée
  dans le tableau des résultats.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si les résultats s'affichent correctement et que les cadres rouges
  apparaissent comme prévu.
- [ ] Échec si la classification prend trop de temps, si les résultats ne
  s'affichent pas ou si les cadres rouges sont incorrects.

### Test 2 : Désactivation du bouton Classifier lors du visionnement du flux vidéo

#### Objectif

Vérifier que le bouton « Classifier » est désactivé lorsque l'utilisateur
visualise le flux vidéo venant du périphérique.

#### Préconditions

- [ ] L'utilisateur est dans la vue du flux vidéo, affichant le flux en direct
  du périphérique.

#### Étapes de test

1. Observer le bouton « Classifier » lorsque l'utilisateur est dans la vue du
   flux vidéo.

#### Résultats attendus

- [ ] Le bouton « Classifier » doit être visiblement désactivé ou inactif.
- [ ] L'utilisateur ne doit pas pouvoir interagir avec le bouton « Classifier »
  dans cette vue.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si le bouton « Classifier » est désactivé et non interactif.
- [ ] Échec si le bouton reste actif ou peut être utilisé.

## Test de la fonctionnalité du bouton Charger

### Test 1 : Chargement d'une image pour la classification

#### Objectif

S'assurer que le bouton « Charger » permet aux utilisateurs de sélectionner et
de charger une image pour la classification.

#### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).

#### Étapes de test

1. Cliquer sur le bouton « Charger ».
2. Naviguer dans l'explorateur de fichiers pour trouver une image à classifier.
3. Sélectionner une image et confirmer la sélection.
4. Observer si l'image sélectionnée s'affiche dans le composant de capture et
   est ajoutée au tableau des Captures.

#### Résultats attendus

- [ ] L'explorateur de fichiers s'ouvre lors du clic sur « Charger ».
- [ ] L'image sélectionnée s'affiche dans le composant de capture.
- [ ] L'image est ajoutée au tableau des Captures.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si l'image est chargée et affichée correctement.
- [ ] Échec si l'explorateur de fichiers ne s'ouvre pas, si l'image ne s'affiche
  pas ou n'est pas ajoutée au tableau des Captures.

### Test 2 : Désactivation du bouton Charger dans la vue du flux vidéo

#### Objectif

Vérifier que le bouton « Charger » est désactivé lorsqu'on visualise le flux
vidéo de la caméra.

#### Préconditions

- [ ] L'utilisateur est dans la vue du flux vidéo.

#### Étapes de test

1. Observer le bouton « Charger » lorsqu'on est dans la vue du flux vidéo.

#### Résultats attendus

- [ ] Le bouton « Charger » doit être visiblement désactivé ou inactif.
- [ ] L'utilisateur ne doit pas pouvoir interagir avec le bouton « Charger »
  dans cette vue.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si le bouton « Charger » est désactivé et non interactif dans la
  vue du flux vidéo.
- [ ] Échec si le bouton reste actif ou peut être utilisé.

## Test de la fonctionnalité du bouton Enregistrer

### Test 1 : Enregistrement des images et captures

#### Objectif

S'assurer que le bouton « Enregistrer » permet aux utilisateurs de sauvegarder
des images et des captures localement.

#### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).
- [ ] Une image est chargée ou une capture est réalisée pour être enregistrée.

#### Étapes de test

1. Cliquer sur le bouton « Enregistrer ».
2. Dans la fenêtre contextuelle « Enregistrer la capture », naviguer entre les
   onglets « Capture » et « Cache ».
3. Dans l'onglet « Capture », entrer un nom de fichier et sélectionner un format
   d'image (PNG, JPEG).
4. Dans l'onglet « Cache », sélectionner les images du tableau des Captures à
   enregistrer.
5. Confirmer l'action d'enregistrement et vérifier si l'image ou les images sont
   bien enregistrées localement sur l'ordinateur.

#### Résultats attendus

- [ ] La fenêtre contextuelle « Enregistrer la capture » apparaît avec des
  options pour enregistrer la capture et le cache.
- [ ] L'image ou les images sont enregistrées dans le format sélectionné dans
  l'ordinateur.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si les images sont enregistrées avec succès dans le format choisi.
- [ ] Échec si la fonctionnalité d'enregistrement ne fonctionne pas ou si les
  images enregistrées ne sont pas conformes aux attentes.

### Test 2 : Désactivation du bouton Enregistrer dans la vue du flux vidéo

#### Objectif

Vérifier que le bouton « Enregistrer » est désactivé lorsqu'on visualise le flux
vidéo du périphérique.

#### Préconditions

- [ ] L'utilisateur est dans la vue du flux vidéo.

#### Étapes de test

1. Observer le bouton « Enregistrer » lorsqu'on est dans la vue du flux vidéo.

#### Résultats attendus

- [ ] Le bouton « Enregistrer » doit être visiblement désactivé ou inactif.
- [ ] L'utilisateur ne doit pas pouvoir interagir avec le bouton « Enregistrer »
  dans cette vue.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si le bouton « Enregistrer » est désactivé et non interactif.
- [ ] Échec si le bouton reste actif ou peut être utilisé.

## Test de la composante Répertoires

### Test 1 : Création d'un nouveau répertoire

#### Objectif

S'assurer que les utilisateurs peuvent créer un nouveau répertoire.

#### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).

#### Étapes de test

1. Cliquer sur l'icône de dossier avec un symbole '+' miniature.
2. Observer l'apparition de la fenêtre contextuelle « Créer un nouveau
   répertoire ».
3. Entrer un nom pour le nouveau répertoire dans le champ de saisie.
4. Cliquer sur le bouton « Créer » pour créer le répertoire.
5. Vérifier si le nouveau répertoire apparaît dans le tableau des Répertoires.

#### Résultats attendus

- [ ] La fenêtre contextuelle « Créer un nouveau répertoire » apparaît après
  avoir cliqué sur l'icône de dossier.
- [ ] Un nouveau répertoire est créé et apparaît dans le tableau des
  Répertoires.
- [ ] L'utilisateur peut annuler la création en cliquant sur « Annuler ».

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si un nouveau répertoire est créé et listé correctement.
- [ ] Échec si le répertoire n'est pas créé, n'apparaît pas, ou si le widget
  contextuel ne fonctionne pas correctement.

### Test 2 : Suppression d'un répertoire

#### Objectif

Vérifier que les utilisateurs peuvent supprimer un répertoire existant.

#### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).
- [ ] Il existe des répertoires dans le tableau des Répertoires.

#### Étapes de test

1. Cliquer sur le bouton « X » à côté d'un répertoire dans le tableau des
   Répertoires.
2. Observer l'apparition du widget contextuel « Supprimer un répertoire ».
3. Confirmer la suppression en cliquant sur le bouton « Supprimer ».
4. Vérifier si le répertoire sélectionné est supprimé du tableau des
   Répertoires.
5. Optionnellement, cliquer sur « Annuler » pour annuler la suppression.

#### Résultats attendus

- [ ] La fenêtre contextuelle « Supprimer un répertoire » apparaît après avoir
  cliqué sur le bouton « X ».
- [ ] Le répertoire sélectionné est supprimé du tableau des Répertoires après
  confirmation.
- [ ] L'utilisateur peut annuler la suppression en cliquant sur « Annuler ».

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si le répertoire est supprimé avec succès.
- [ ] Échec si le répertoire n'est pas supprimé ou si la fenêtre contextuelle ne
  fonctionne pas correctement.

# Test de la sélection de répertoires et de la fonctionnalité de téléversement

## Test 1 : Sélection d'un répertoire pour les téléversements

### Objectif

S'assurer que les utilisateurs peuvent sélectionner un répertoire pour
enregistrer de nouvelles captures ou des images téléversées.

### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).
- [ ] Plusieurs répertoires sont disponibles pour la sélection.

### Étapes de test

1. Sélectionner un répertoire dans la liste des Répertoires.
2. Capturer une nouvelle image ou téléverser une image existante.
3. Vérifier si la nouvelle image est ajoutée au répertoire sélectionné.

### Résultats attendus

- [ ] L'utilisateur peut sélectionner un répertoire dans la liste des
  Répertoires.
- [ ] Les nouvelles captures ou images téléversées sont ajoutées au dossier du
  répertoire sélectionné.

### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

### Succès/Échec

- [ ] Succès si les nouvelles images sont correctement ajoutées au répertoire
  sélectionné.
- [ ] Échec si les images ne sont pas ajoutées au bon répertoire ou si la
  sélection ne fonctionne pas.

## Test 2 : Suppression des captures dans le tableau des Captures

### Objectif

Vérifier que les utilisateurs peuvent supprimer toutes les captures du tableau
des Captures.

### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).
- [ ] Le tableau des Captures contient une ou plusieurs images.

### Étapes de test

1. Cliquer sur l'icône de la corbeille située dans l'en-tête du tableau des
   Captures.
2. Confirmer l'action si une fenêtre de confirmation apparaît.
3. Observer si toutes les captures sont supprimées du tableau.

### Résultats attendus

- [ ] Toutes les captures sont supprimées du tableau des Captures après avoir
  cliqué sur l'icône de la corbeille.
- [ ] Une confirmation de suppression peut apparaître avant d'exécuter l'action.

### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

### Succès/Échec

- [ ] Succès si toutes les captures sont supprimées avec succès.
- [ ] Échec si des captures restent visibles dans le tableau ou si l'icône de la
  corbeille ne fonctionne pas correctement.

# Test de la composante Résultats

## Test 1 : Basculer entre les rapports groupés et individuels

### Objectif

S'assurer que les utilisateurs peuvent basculer entre les rapports groupés et
individuels dans le tableau des Résultats.

### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).
- [ ] Le tableau des Résultats est rempli avec des résultats de classification.

### Étapes de test

1. Cliquer sur l'icône « grouper/dégrouper » dans le tableau des Résultats.
2. Observer les modifications dans la présentation des résultats de
   classification.
3. Basculer plusieurs fois entre les modes groupé et individuel pour tester les
   deux vues.

### Résultats attendus

- [ ] En cliquant sur l'icône, l'affichage des résultats passe entre le mode
  groupé et le mode individuel.
- [ ] Le tableau des Résultats affiche correctement les données selon le mode
  sélectionné.

### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

### Succès/Échec

- [ ] Succès si le basculement entre les deux modes fonctionne correctement.
- [ ] Échec si le tableau ne met pas à jour l'affichage ou affiche des données
  incorrectes.

## Test de la liste des modèles en fonction de la configuration de l'environnement

### Test 1 : Remplissage avec des données réelles

#### Objectif

Vérifier que la fenêtre « Results Tuner » affiche la liste des modèles avec des
données réelles lorsque `VITE_APP_MODE` est configuré en mode production.

#### Préconditions

- [ ] L'application est en cours d'exécution.
- [ ] Le serveur backend est opérationnel.
- [ ] La variable d'environnement `VITE_APP_MODE` est définie à une valeur autre
  que `"test"`.

#### Étapes de test

1. Démarrer l'application.
2. Naviguer vers la fenêtre « Results Tuner ».
3. Observer la liste des modèles et vérifier qu'elle est remplie.
4. Vérifier que les modèles affichés correspondent aux données du backend.

#### Résultats attendus

- [ ] La liste des modèles dans la fenêtre « Results Tuner » est remplie avec
  des données réelles provenant du backend.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si la liste des modèles affiche les données réelles attendues.
- [ ] Échec si la liste ne se remplit pas, affiche des données incorrectes ou
  affiche des données de test.

### Test 2 : Remplissage avec des données de test

#### Objectif

Vérifier que la fenêtre « Résultats Tuner » affiche des données de test lorsque
`VITE_APP_MODE` est configuré sur `"test"`.

#### Préconditions

- [ ] L'application est ouverte et en cours d'exécution.
- [ ] La variable d'environnement `VITE_APP_MODE` est définie sur `"test"`.

#### Étapes de test

1. Démarrer l'application.
2. Naviguer vers la fenêtre « Results Tuner ».
3. Observer la liste des modèles et vérifier qu'elle est remplie.
4. Vérifier que les modèles affichés correspondent aux données de test.

#### Résultats attendus

- [ ] La liste des modèles dans la fenêtre « Results Tuner » est remplie avec
  des données statiques de test.

#### Résultats observés

- [ ] Décrire ce qui s'est réellement passé lors de l'exécution du test.

#### Succès/Échec

- [ ] Succès si la liste des modèles affiche les données de test attendues.
- [ ] Échec si la liste ne se remplit pas, affiche des données incorrectes ou
  affiche des données réelles au lieu des données de test.

## Sélection améliorée du modèle et processus de classification

### Objectif

Vérifier que l'application permet aux utilisateurs de sélectionner un modèle de
classification via un bouton dédié "Sélection du modèle", qui ouvre une fenêtre
contextuelle pour le choix du modèle. Assurer que le bouton "CLASSIFIER"
déclenche une requête d'inférence utilisant le modèle sélectionné. De plus,
confirmer qu'une icône de chargement apparaît pendant la requête et disparaît
une fois celle-ci terminée.

### Test 1 : Sélection d’un modèle via un bouton dédié

#### Préconditions

- [ ] L'application est ouverte et en cours d'exécution.
- [ ] Le serveur backend est opérationnel.

#### Étapes du test

1. Cliquer sur le bouton "Sélection du modèle".
2. Vérifier que la fenêtre contextuelle affiche une liste des modèles
   disponibles.
3. Sélectionner un modèle dans la liste et fermer la fenêtre contextuelle.
4. Vérifier que le modèle sélectionné est affiché ou indiqué en dehors de la
   fenêtre contextuelle.

#### Résultats attendus

- [ ] La fenêtre contextuelle avec la liste des modèles apparaît après avoir
  cliqué sur "Sélection du modèle".
- [ ] L'utilisateur peut sélectionner un modèle et la sélection est clairement
  indiquée.

#### Résultats observés

- [ ] Décrire les résultats réels du test.

#### Succès/Échec

- [ ] Succès si la fenêtre de sélection fonctionne correctement et que le modèle
  choisi est bien affiché.
- [ ] Échec si la fenêtre ne s'affiche pas, si la sélection du modèle ne
  fonctionne pas ou si le modèle sélectionné n'est pas indiqué.

### Test 2 : Requête d'inférence et affichage de l'icône de chargement

#### Préconditions

- [ ] Un modèle a été sélectionné via le bouton "Sélection du modèle".
- [ ] Le bouton "CLASSIFIER" est activé.

#### Étapes du test

1. Cliquer sur le bouton "CLASSIFIER" pour démarrer le processus d'inférence.
2. Vérifier qu'une icône de chargement s'affiche pour indiquer que le processus
   est en cours.
3. Attendre que la requête d'inférence soit terminée.

#### Résultats attendus

- [ ] Une icône de chargement apparaît immédiatement après avoir cliqué sur
  "CLASSIFIER".
- [ ] L'icône disparaît et les résultats de l'inférence sont affichés une fois
  la requête terminée.

#### Résultats observés

- [ ] Décrire les résultats réels du test.

#### Succès/Échec

- [ ] Succès si l'icône de chargement apparaît pendant le processus et disparaît
  après, avec affichage des résultats.
- [ ] Échec si l'icône de chargement ne s'affiche pas, reste visible après la
  fin du processus ou si les résultats ne s'affichent pas.

## Affichage des 5 meilleurs résultats de classification

### Objectif : Expansion d'une seule ligne

Vérifier que les utilisateurs peuvent afficher les cinq meilleurs résultats de
classification en développant une seule ligne du tableau des Résultats à la
fois.

### Test 1 : Fonctionnalité d'expansion d'une seule ligne

#### Objectif

Valider la fonctionnalité qui permet aux utilisateurs d'afficher les détails des
cinq meilleurs résultats pour une seule ligne à la fois.

#### Préconditions

- [ ] L'application est ouverte et l'utilisateur est connecté (si nécessaire).
- [ ] Le tableau des Résultats est rempli avec des résultats de classification.

#### Étapes du test

1. Trouver une ligne du tableau des Résultats représentant une classification
   d'image.
2. Cliquer sur cette ligne pour déclencher la fonction d’expansion.
3. Vérifier si seule la ligne cliquée s'agrandit pour afficher les détails
   supplémentaires.
4. Cliquer sur une autre ligne et vérifier que la ligne précédemment agrandie se
   rétracte et que la nouvelle ligne s’agrandit.

#### Résultats attendus

- [ ] Seule la ligne sélectionnée s’agrandit et affiche les cinq meilleurs
  résultats.
- [ ] Lorsqu'une nouvelle ligne est sélectionnée, la précédente se rétracte
  automatiquement.

#### Résultats observés

- [ ] Décrire les résultats réels du test.

#### Succès/Échec

- [ ] Succès si seule une ligne s'agrandit à la fois et que l'expansion se fait
  correctement.
- [ ] Échec si plusieurs lignes peuvent être agrandies en même temps ou si le
  basculement ne fonctionne pas.

### Test 2 : Exactitude de l'affichage des 5 meilleurs résultats

#### Objectif

Vérifier l'exactitude et l'affichage correct des cinq meilleurs résultats de
classification dans une ligne développée.

#### Préconditions

- [ ] Une ligne du tableau des Résultats est développée pour afficher les cinq
  meilleurs résultats de classification.

#### Étapes du test

1. Comparer les cinq meilleurs résultats affichés avec les données attendues du
   backend.
2. Vérifier que les libellés et les scores sont correctement affichés.
3. Confirmer que les scores sont bien formatés (ex. pas de notation scientifique
   pour les petits nombres) et correspondent aux données du backend.

#### Résultats attendus

- [ ] Les libellés et scores des cinq meilleurs résultats correspondent aux
  données du backend.
- [ ] Les scores sont affichés dans un format lisible en pourcentage.

#### Résultats observés

- [ ] Décrire les résultats réels du test.

#### Succès/Échec

- [ ] Succès si les cinq meilleurs résultats sont affichés correctement et
  correspondent aux données du backend.
- [ ] Échec en cas d'inexactitudes dans les libellés, les scores ou les formats
  d'affichage.

### Test 3 : Cohérence et réactivité de l'interface utilisateur

#### Objectif

Évaluer la cohérence et la réactivité de l'interface utilisateur lors de
l'expansion et de la rétractation des lignes du tableau des Résultats.

#### Préconditions

- [ ] Au moins une ligne du tableau des Résultats peut être développée pour
  afficher les cinq meilleurs résultats.

#### Étapes du test

1. Agrandir une ligne, puis agrandir une autre ligne pour s'assurer qu'une seule
   ligne peut être développée à la fois.
2. Redimensionner la fenêtre du navigateur pour tester la réactivité et vérifier
   si l'affichage s'ajuste correctement.
3. Naviguer hors du tableau des Résultats, puis y revenir, pour vérifier que
   l'état développé d'une ligne ne persiste pas après navigation.

#### Résultats attendus

- [ ] Une seule ligne peut être développée à un moment donné, et en sélectionner
  une nouvelle referme automatiquement la précédente.
- [ ] La mise en page et l'affichage des résultats s’adaptent correctement au
  redimensionnement de la fenêtre du navigateur.
- [ ] L'expansion d'une ligne ne persiste pas lorsqu'on quitte puis revient au
  tableau des Résultats.

#### Résultats observés

- [ ] Décrire les problèmes d’interface utilisateur, de performance ou d’état du
  tableau observés.

#### Succès/Échec

- [ ] Succès si l'interface fonctionne correctement et maintient la qualité et
  la fluidité attendues.
- [ ] Échec si plusieurs lignes peuvent être agrandies simultanément ou si des
  problèmes d'affichage ou de gestion d'état sont constatés.
