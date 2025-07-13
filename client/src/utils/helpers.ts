const decodeHtmlEntities = (text: string) => {
    return text.replace(/&quot;/g, '"').replace(/&#039;/g, "'");
}

export { decodeHtmlEntities };