```javascript
// Form Store holds data for a form. 
FormStore<T,K> {
    apiConfig: {
        GET: // The get endpoint for the object that holds the form
        POST: // The post endpoint for the object
        PUT: // The put endpoint for the object
        PATCH: // The patch endpoint for the object
        DELETE: // The DELETE endpoint for the object
    },

    // data points are stored as FieldProperty. Similar to StateProperty, FieldProperty has the following properties
    fields: FieldProperty<T> // where T the data type of the field {
        // The value of the data point as entered by the user, or calculated by business logic
        value: T 

        // The status of the value (good for save-as-you-go functionality). 
        status: pristine | dirty | invalid | saving | saved | saveError
        
        // The errors on the field. This could be a single object, or break them into top-level error objects
        errors: { 
            validationErrors: ValidationError[] {
              // reflects validatorName
              {key: string }: string
            }, 
            saveError: ApiError // if the SaveStrategy is SaveOnBlur
        }

        // The configuration object for the field control
        configuration: FieldConfiguration<K>

        // the validators that apply to the field
        validators: required | minLength | minValue | maxLength | maxValue | RegEx []

        // This is helpful if you want to support undo.
        // This is an array of values that can be popped off when undo is called
        previousValues: PreviousState<T>[] {
                value: T;
                timeStamp: DateTime;
                validationErrors: ValidationErrors[];
            }
    },

    // What rules does the form have? If one field contains a certain value, how does that affect other fields on the form?
    fieldRules: {
        fieldName: // the name of the field that triggers the action
        valueToMatch: // the value or array of possible values that trigger the action. The matching logic could be Array.isArray(valueToMatch) ? valueToMatch.contains(value) : valueToMatch.includes(value); Need to solve for in-between logic
        effectedFields: {
            fieldName: // the name of the field to perform an action on
            action: show | hide | require | disable | read-only | setValue
        }[]
    }[]

    // How does the form save?
    // SaveOnBlur means the form saves each data point when the field is blurred. A status icon could be shown at the field level
    // SaveOnAction means the form will wait for the "Save Form" action to be dispatched to call the API and save. The whole form will show as loading while the save occurs and becomes interactable after that.
    saveStrategy: SaveOnBlur | SaveOnAction

    //If the form's saveStrategy is SaveOnAction
    apiError: ApiError {
        message
        elasticTraceId
        stackTrace
        userFriendlyMessage
    }
    status: pristine | dirty | invalid | saving | saved | saveError
}
```
