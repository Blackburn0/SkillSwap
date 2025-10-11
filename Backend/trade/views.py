from rest_framework import viewsets, permissions
from .models import Trade, TradeProposal
from .serializers import TradeSerializer, TradeProposalSerializer


class TradeProposalViewSet(viewsets.ModelViewSet):
    queryset = TradeProposal.objects.all().order_by("-proposal_date")
    serializer_class = TradeProposalSerializer
    # permission_classes = [permissions.IsAuthenticated]


class TradeViewSet(viewsets.ModelViewSet):
    queryset = Trade.objects.all().order_by("-start_date")
    serializer_class = TradeSerializer
    # permission_classes = [permissions.IsAuthenticated]
