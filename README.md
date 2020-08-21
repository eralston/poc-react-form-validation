# poc-react-form-validation
Experimentation in React-based form validation

## Form
While this focuses on the validation step of a form, consider the whole life-cycle of a user interaction with a form and how you might combine existing components to make it an unforgettable experience:
- Revealing the form to the user (EG, appearing on a page, animating open in a modal)
- Presenting the fields with useful information (EG, annoated information)
- Receiving input that is validated (ideally in real-time)
- Completing all required fields in the required format, making submission available (EG, submit button does from disabled to enabled)
- Clicking submit and having the form gracefully wait for the server request to complete (EG, waiting spinner on the button, form goes into lockdown)
- A failure of the server request, resulting in information being shown to the user (EG, a textual error near the submit button indicating a problem - don't rely on an error modal or popup since you're already in a modal)
- Fixing the input somehow and re-submitting to have it succeed (EG, succeess feedback followed by the dialog automatically closing after a timeout)

Your ideal experience could be even better than this. How can we make it happen?

This path certainly emphasizes certainly emphasizes a library for validation, but something for annotating fields with information (EG, popovers), a UI pattern for form locking, and even a clever way of making the form disappear and show success would all be great contributions.

## Form Valiation
Most apps have UI transcations with fields and a submit button. Before that submit button can enabled itself, that form should asynchronously validate itself to know it's safe.

Scenarios would include:
- Required fields that must have a value
- Email fields that must have a valid email
- Regex fields that are restricted on characters (EG, alphanumeric and dash only)
- Fields that will asynchronously query the server for information to validate (EG, check if an email address or identifier is already taken)

Along with fields that should automatically transform their contents, like:
- Lowercase-only fields that turn uppers into lowers
- Turning spaces into dashes

Furthermore, when errors are indicated from the client-side or server-side, there should be options for styling, annotating, or otherwise giving feedback to the user like:
- Toggling classes on the field (EG, turn it red)
- Annotating the field with text (EG, "Must be a valid email in the format name@server.com")
- Applying icons to the field (EG, check for good, X for bad)

Keep in mind the form may be embedded in a "page" style or appear in a modal, which should only proceed to submission if both client-side and the request to the server succeeds.

## Positive Qualities of a Solution
Ensure the solution fits into React as elegantly as possible, with the following likely positive qualities:
- Declarative over procedural; however, actions like async validation via server calls will likely require ability to call back to code
- All-in-one? It might be positive to have a couple libraries do the work, EG, one validation library for fields, maybe something that does the form lockdown pattern. Don't be afraid to take a "best-of-breed" approach for what's hard then just make a nice Typescript class for the rest.
- Working in all modern browsers is obviously (Edge, Chrome, Firefox, Safari); however, backward compatibility is a nice-to-have positive trait
- Compatibility with Jest & Enzyme (EG, form validation firing on bad data being discoverable via unit testing would be awesome)

## Negative Qualities of a Solution
As if it isn't obvious:
- Low performance
- Stuttering on the real-time correction
- Arduous changes to the code to support it

## Possible Libraries
I didn't do an exhaustive survey of validation libraries, but based on the first page of Google and a dive into Medium:
- There are a lot of libraries. [Check out this Medium post for a rundown](https://blog.logrocket.com/the-ultimate-roundup-of-react-form-validation-solutions/).
- Based on comparing some of the first page of Google offerings, I think [React Hook Form](https://react-hook-form.com/) looks really promising. Great syntax, perfromance, and features. I can't tell off the bat how it might implement async server-side interaction, but maybe that's just something to roll yourself.