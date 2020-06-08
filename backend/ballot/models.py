from django.db import models
from django.conf import settings

DUAL_CHOICE = '2C'
MULTIPLE_CHOICE = 'MC'
QUESTION_CHOICES = [
    (DUAL_CHOICE, '2 Choices'),
    (MULTIPLE_CHOICE, 'Multiple Choices'),
]


class Question(models.Model):
    title = models.CharField(max_length=600)
    subtitle = models.CharField(max_length=600, blank=True, null=True)
    question_type = models.CharField(
        max_length=2, choices=QUESTION_CHOICES, default='2C')
    created = models.DateField(auto_now=True)
    expires = models.DateField(blank=True, null=True)
    choices = models.ManyToManyField(to='Choice')

    def __repr__(self):
        return f'{self.title}'

    def __str__(self):
        return f'{self.title}'


class Choice(models.Model):
    title = models.CharField(max_length=600)

    def __repr__(self):
        return f'{self.title}'

    def __str__(self):
        return f'{self.title}'


class Vote(models.Model):
    question = models.ForeignKey(
        to='Question', on_delete=models.CASCADE, null=True, blank=True)
    choice = models.ForeignKey(to='Choice', on_delete=models.CASCADE)
    user = models.ForeignKey(to=settings.AUTH_USER_MODEL,
                             on_delete=models.DO_NOTHING)
    date = models.DateField(auto_now=True)

    def __str__(self):
        return f'{self.user.username} - {self.question.title}'
