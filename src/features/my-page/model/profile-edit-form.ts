export interface ProfileEditFormValues {
  name: string
  email: string
  teamCode: string
  roleCode: string
}

export type ProfileEditFormErrors = Partial<
  Record<keyof ProfileEditFormValues, string>
>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateProfileEditForm(
  values: ProfileEditFormValues,
): ProfileEditFormErrors {
  const errors: ProfileEditFormErrors = {}

  if (!values.name.trim()) {
    errors.name = "이름을 입력해주세요."
  }

  if (!values.email.trim()) {
    errors.email = "이메일을 입력해주세요."
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "이메일 형식이 올바르지 않습니다."
  }

  if (!values.teamCode) {
    errors.teamCode = "팀을 선택해주세요."
  }

  if (!values.roleCode) {
    errors.roleCode = "역할을 선택해주세요."
  }

  return errors
}
