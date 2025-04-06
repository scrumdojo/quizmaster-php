export const LoadedIndicator = ({ isLoaded }: { isLoaded: boolean }) => (
    <input id="is-loaded" type="hidden" value={isLoaded ? 'loaded' : ''} />
)

export const QuestionLink = ({ url }: { url: string }) =>
    url && (
        <>
            <h3>Link to see the question:</h3>
            <a id="question-link" href={url}>
                {url}
            </a>
        </>
    )

export const QuestionEditLink = ({ editUrl }: { editUrl: string }) =>
    editUrl && (
        <>
            <h3>Link to edit the question:</h3>
            <a id="question-edit-link" href={editUrl}>
                {editUrl}
            </a>
        </>
    )

export const ErrorMessage = ({ errorMessage }: { errorMessage: string }) =>
    errorMessage && <span id="error-message">{errorMessage}</span>
