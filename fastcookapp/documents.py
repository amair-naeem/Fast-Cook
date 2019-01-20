from django_elasticsearch_dsl import DocType, Index, fields
from fastcookapp.models import Member,Profile,XMLGraph

members = Index('members')

@members.doc_type
class MemberDocument(DocType):
	class Meta:
		model = Member
		fields = [
			'username'
		]