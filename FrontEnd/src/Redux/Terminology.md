slice: חלק מהמידע שנמצע בglobal state
reducer: פונצקיה המבצעת שינוי כלשהו על חלק מהמידע
action: אובייקט שנשלח ל reducer
עבור שינוי המידע
payload: מאפיין באובייקט הaction
המכיל את המידע הדרוש לשינוי
currentState: המידע הנוכחי
newState: המידע החדש אחרי השינוי
AppState: כלל המידע ברמת האפליקציה.
dispatch: פונקציה לשליחת מידע לצורך שינוי.
store: האובייקט הראשי של רידקס דרכו מבצעים הכל.
Action Creator: פונקציה ליצירת אובייקט action

התקנות:
npm i react-redux @types/react-redux @reduxjs/toolkit

component > service > server > response from server > appstate > reducer(currentstate) > appstate(newstate) > component(newstate)