from rest_framework import serializers
from .models import Trade, TradeProposal


class TradeProposalSerializer(serializers.ModelSerializer):
    class Meta:
        model = TradeProposal
        fields = "__all__"
        read_only_fields = ["proposal_id", "proposal_date", "last_status_update"]


class TradeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Trade
        fields = "__all__"
        read_only_fields = ["trade_id", "start_date"]
