import { useQuizMetaStore } from "@/stores/quizMetaStore"
import type { Question, Answer, State } from "@/utils/types"
import { decodeHtmlEntities } from "@/utils/helpers"
import defaultData from "@/data/testData"

const fetchQuestions = async () => {

    let questions : Question[] = []
    let initchoices : Answer[] = []
    let status: State = 'loading';

    const url = new URL('https://opentdb.com/api.php')
    const meta = useQuizMetaStore()

    if (meta.numberOfQuestions) url.searchParams.set('amount', meta.numberOfQuestions.toString())

    if (meta.category) url.searchParams.set('category', meta.category)

    if (meta.difficulty) url.searchParams.set('difficulty', meta.difficulty)

    try {
        const res = await fetch(url.toString())

        if (!res.ok){
            const errorDetails = await res.text();
            throw new Error(`Network response was not ok: ${res.status} ${res.statusText} - ${errorDetails}`);
        }
            
        const data = await res.json()

        if (data.results) {
            questions = data.results.map((q: {
                question: string;
                correct_answer: string;
                incorrect_answers: string[];
            }): Question => ({
                question: decodeHtmlEntities(q.question),
                correct_answer: decodeHtmlEntities(q.correct_answer),
                answers: q.incorrect_answers.map((a: string): string => decodeHtmlEntities(a))
            }))

            initchoices = data.results.map((question: any) => {
                return {
                    question: decodeHtmlEntities(question.question),
                    selectedAnswer: null,
                    isCorrect: false
                }
            });

            status = 'done'
        }
        else {
            throw new Error(`Unable to load data`)
        }
        
    } catch (error) {
        console.error('Fetch error:', error);
        questions = defaultData.results;
        initchoices = defaultData.results.map((question: any) => {
            return {
                question: question.question,
                selectedAnswer: null,
                isCorrect: false
            }
        });
        status = 'error';
    }

    return {
        questions,
        initchoices,
        status
    }
}

export default fetchQuestions