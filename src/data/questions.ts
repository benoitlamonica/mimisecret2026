import type { ReplaceSpaces } from "@/utils/types"

export type QuestionDifficulty = 'easy' | 'medium' | 'hard'

export interface QuestionDefinition<Name extends string = string> {
  name: Name
  options: string[]
  answer: string
}

export interface Question<Name extends string = string> extends QuestionDefinition<Name> {
  id: ReplaceSpaces<Name>
  difficulty: QuestionDifficulty
}

const easyQuestions: QuestionDefinition[] = [
  {
    name: 'Sample Question',
    options: ['Option 1', 'Option 2', 'Option 3'],
    answer: 'Option 1'
  }
]

const mediumQuestions: QuestionDefinition[] = [
  {
    name: 'Sample Medium Question',
    options: ['Option 1', 'Option 2', 'Option 3'],
    answer: 'Option 2'
  }
]

const hardQuestions: QuestionDefinition[] = [
  {
    name: 'Sample Hard Question',
    options: ['Option 1', 'Option 2', 'Option 3'],
    answer: 'Option 3'
  }
]

function addQuestionData<Name extends string>(questions: QuestionDefinition<Name>[], difficulty: QuestionDifficulty): Question<Name>[] {
  return questions.map((q) => ({
    ...q,
    id: q.name.replace(/\s+/g, '') as ReplaceSpaces<Name>,
    difficulty
  }))
}

export const questions: Question[] = [
  ...addQuestionData(easyQuestions, 'easy'),
  ...addQuestionData(mediumQuestions, 'medium'),
  ...addQuestionData(hardQuestions, 'hard')
]
